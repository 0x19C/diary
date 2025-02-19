import { create } from "zustand";
import * as API from "@/api/diary";
import { type Diary } from "@/api/common";

type IStoreError = { error: string; message: string } | null | undefined;

export interface IDiaryStore {
  isLoading: boolean;
  diaries: Diary[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  error: IStoreError;
  createDiary(formData: FormData): Promise<{ message: string }>;
  listDiary(page: number, per_page: number): Promise<{ message: string }>;
  removeDiary(id: string): Promise<{ message: string }>;
  updateDiary(id: string, formData: FormData): Promise<{ message: string }>;
  getDiaryById(id: string): Promise<Diary>;
}

export const useDiaryStore = create<IDiaryStore>((set) => ({
  isLoading: false,
  diaries: [],
  total: 0,
  current_page: 1,
  per_page: 5,
  last_page: 0,
  next_page_url: null,
  prev_page_url: null,
  error: null,

  // Create Diary
  createDiary: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      const res = await API.diaryCreation(formData);
      set((state) => ({
        diaries: [...state.diaries, res],
      }));
      return { message: "日記データが作成されました。" };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // List Diaries
  listDiary: async (page: number = 1, per_page: number = 5) => {
    set({ isLoading: true });
    try {
      const res = await API.diaryListing(page, per_page);
      set({
        diaries: res.data,
        total: res.pagination.total,
        current_page: res.pagination.current_page,
        per_page: res.pagination.per_page,
        last_page: res.pagination.last_page,
        next_page_url: res.pagination.next_page_url,
        prev_page_url: res.pagination.prev_page_url,
      });
      return { message: "日記データがロードされました。" };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove Diary
  removeDiary: async (id: string) => {
    set({ isLoading: true });
    try {
      await API.diaryDeleting(id);
      set((state) => ({
        diaries: state.diaries.filter((diary) => diary.id !== id),
      }));
      return { message: "日記データが削除されました。" };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Update Diary
  updateDiary: async (id: string, formData: FormData) => {
    set({ isLoading: true });
    try {
      const res = await API.diaryUpdating(id, formData);
      set((state) => ({
        diaries: state.diaries.map((diary) =>
          diary.id === id ? res : diary
        ),
      }));
      return { message: "日記データが更新されました。" };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

getDiaryById: async (id: string) => {
  set({isLoading : true});
  try {
    const res = await API.diaryDetailing(id);
    return res;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    set({ isLoading: false});
  }
}
}));
