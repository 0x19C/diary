import { create } from "zustand";
import * as API from "@/api/auth";

type IStoreError = { error: string; message: string } | null | undefined;
interface UserResponseData {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
}
export interface IManagerAuthState {
  isLoading: boolean;
  isLoggedIn: number;
  isAdmin:boolean;
  error: IStoreError;
  actionLoginWithCredential(formData: FormData): Promise<{ message: string }>;
  actionRegisterWithCredential(
    formData: FormData
  ): Promise<{ message: string }>;
  actionLogout(): Promise<{ message: string }>;
  actionWhoAmICredential(): Promise<{message: string, data: UserResponseData | null }>;
}

export const useAuthStore = create<IManagerAuthState>((set) => ({
  isLoading: false,
  isLoggedIn: 0,
  error: null,
  isAdmin: false,
  actionLoginWithCredential: async (formData: FormData) =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.loginWithCredential(formData)
        .then((res) => {
          set({
            isLoggedIn: 2,
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
            isLoggedIn: 2,
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
            isLoggedIn: 1,
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
      API.whoAmI()
        .then((res) => {
          set({isLoggedIn: 2})
          set({isAdmin: res.data?.is_admin})
          set({isLoading: false})
          resolve({
            message: res.message,
            data: res.data
          });
        })
        .catch((e) => {
          reject(e);
          set({isLoggedIn: 1})
          set({isLoading: false})

        })
        .finally(() => {
          set({isLoading: false});
        })
        
    })
}));
