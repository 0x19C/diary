import { create } from "zustand";
import * as API from "@/api/auth";
import { AxiosHeaders } from "axios";

type IStoreError = { error: string; message: string } | null | undefined;
interface UserResponseData {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
}
export interface IManagerAuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  isAdmin:boolean;
  error: IStoreError;
  actionLoginWithCredential(formData: FormData): Promise<{ message: string }>;
  actionRegisterWithCredential(
    formData: FormData
  ): Promise<{ message: string }>;
  actionLogout(): Promise<{ message: string }>;
  actionWhoAmICredential(): Promise<{message: string, data: UserResponseData }>;
}

export const useAuthStore = create<IManagerAuthState>((set) => ({
  isLoading: false,
  isLoggedIn: false,
  error: null,
  isAdmin: false,
  actionLoginWithCredential: async (formData: FormData) =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.loginWithCredential(formData)
        .then((res) => {
          set({
            isLoggedIn: true,
          });
          
          resolve({
            message: res.message,
          });
          
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
  actionRegisterWithCredential: async (formData: FormData) =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.registerWithCredential(formData)
        .then((res) => {
          set({
            isLoggedIn: true,
          });
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
  actionLogout: async () =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.logout()
        .then((res) => {
          set({
            isLoggedIn: false,
          });
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
  actionWhoAmICredential: async () => 
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      const headers = new AxiosHeaders();
      headers.set("Content-Type", "multipart/form-data");
      API.whoAmI(headers)
        .then((res) => {
          set({isLoggedIn: true})
          set({isAdmin: res.data.is_admin})
          set({isLoading: false})
          resolve({
            message: res.message,
            data: res.data
          });
        })
        .catch((e) => {
          reject(e);
          set({isLoggedIn: false})
          set({isLoading: false})

        })
        
    })
}));
