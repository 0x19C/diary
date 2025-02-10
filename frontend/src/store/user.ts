import { create } from "zustand";
import * as API from "@/api/users";

import { User } from "@/api/common";

type IStoreError = { error: string; message: string } | null | undefined;

export interface IUserStore {
  isLoading: boolean;
  users: User[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  error: IStoreError;
  listUser(page: number, per_page: number): Promise<{ message: string }>;
  removeUser(id: string): Promise<{ message: string }>;
}

export const userStore = create<IUserStore>((set) => ({
  isLoading: false,
  users: [],
  total: 0,
  current_page: 1,
  per_page: 10,
  last_page: 0,
  next_page_url: null,
  prev_page_url: null,
  error: null,

  // List Users
  listUser: async (page: number = 1, per_page: number = 5) => {
    set({ isLoading: true });
    try {
      const res = await API.userListing(page, per_page);
      set({
        users: res.data,
        total: res.pagination.total,
        current_page: res.pagination.current_page,
        per_page: res.pagination.per_page,
        last_page: res.pagination.last_page,
        next_page_url: res.pagination.next_page_url,
        prev_page_url: res.pagination.prev_page_url,
      });
      return { message: "Successfully Listed!" };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove User
  removeUser: async (id: string) => {
    set({ isLoading: true });
    try {
      await API.userDeleting(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
      return { message: "Successfully Deleted!" };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

}));
