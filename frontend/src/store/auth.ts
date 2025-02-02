import { create } from "zustand";
import * as API from "@/api/auth";

type IStoreError = { error: string; message: string } | null | undefined;

export interface IManagerAuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: IStoreError;
  token: string;
  actionLoginWithCredential(email: string, password: string): Promise<any>;
  actionRegisterWithCredential(
    name: string,
    email: string,
    password: string
  ): Promise<any>;
  actionVerifyToken(): Promise<any>;
}

export const useAuthStore = create<IManagerAuthState>((set) => ({
  isLoading: false,
  isLoggedIn: false,
  error: null,
  token: "",
  actionLoginWithCredential: async (email: string, password: string) =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.loginWithCredential({ email, password })
        .then((res) => {
          if (res.token) {
            set({
              isLoggedIn: true,
              token: res.token,
            });
            try {
              document.cookie = `manager-token=${res.token}; path=/`;
            } catch (_) {}
          }
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
  actionRegisterWithCredential: async (
    name: string,
    email: string,
    password: string
  ) =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.registerWithCredential({ name, email, password })
        .then((res) => {
          if (res.token) {
            set({
              isLoggedIn: true,
              token: res.token,
            });
            try {
              document.cookie = `manager-token=${res.token}; path=/`;
            } catch (_) {}
          }
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
  actionVerifyToken: async () =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.verifyToken()
        .then((res) => {
          set({ error: null, isLoggedIn: true });
          resolve(res);
        })
        .catch((e) => {
          set({ error: e });
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
}));
