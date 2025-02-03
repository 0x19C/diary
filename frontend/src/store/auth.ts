import { create } from "zustand";
import * as API from "@/api/auth";

type IStoreError = { error: string; message: string } | null | undefined;

export interface IManagerAuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: IStoreError;
  actionLoginWithCredential(formData: FormData): Promise<{ message: string }>;
  actionRegisterWithCredential(formData: FormData): Promise<{ message: string }>;
}

export const useAuthStore = create<IManagerAuthState>((set) => ({
  isLoading: false,
  isLoggedIn: false,
  error: null,
  actionLoginWithCredential: async (formData: FormData) =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.loginWithCredential(formData)
        .then((res) => {
          set({
            isLoggedIn: true,
          });
          resolve({
            message: res.message
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
}));
