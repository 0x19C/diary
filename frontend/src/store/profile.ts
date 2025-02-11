import { create } from "zustand";
import * as API from "@/api/profile";

type IStoreError = { error: string; message: string } | null | undefined;
interface UserResponseData {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
}
export interface IProfileState {
  isLoading: boolean;
  isAdmin:boolean;
  error: IStoreError;
  actionGetProfile(): Promise<{ message: string, data: UserResponseData }>;
  actionUpdateProfile(name: string): Promise<{ message: string, data: UserResponseData }>;
  actionChangePassword(currentPwd: string, pwd: string, cpwd: string): Promise<{ message: string, data: UserResponseData}>
}

export const useProfileStore = create<IProfileState>((set) => ({
  isLoading: false,
  error: null,
  isAdmin: false,
  actionGetProfile: async () =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.getProfile()
        .then((res) => {
          resolve({
            data: res.data,
            message: res.message,
          });
        })
        .catch((e) => {
          reject(e);
          set({
            isLoading: false,
          });
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
  actionUpdateProfile: async (name: string) => {
    set({ isLoading: true });
    return new Promise<{ message: string; data: UserResponseData }>((resolve, reject) => {
      API.updateProfile(name)
        .then((res) => {
          resolve({
            data: res.data,
            message: 'Profile updated successfully!',
          });
        })
        .catch((e) => {
          reject(e);
          set({ isLoading: false });
        })
        .finally(() => {
          set({ isLoading: false });
        });
    });
  },
  actionChangePassword: async (currentPwd: string, pwd: string, cpwd: string) => {
    return new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.changePassword(currentPwd, pwd, cpwd)
        .then((res) => {
          resolve({
            data: res.data,
            message: 'Password updated successfully.',
          });
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    });
  },
}));

