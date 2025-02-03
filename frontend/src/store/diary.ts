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
  listDiary(page: number): Promise<{ message: string }>;
  updateDiary(id: string, formData: FormData): Promise<{ message: string }>;
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
  createDiary: async (formData: FormData) =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.diaryCreation(formData)
        .then((res) => {
          set((state) => ({ diaries: [...state.diaries, res] }));
          resolve({ message: "Successfully Created!" });
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
  listDiary: async (page: number = 1) =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.diaryListing(page)
        .then((res) => {
          set({
            diaries: res.data,
            total: res.pagination.total,
            current_page: res.pagination.current_page,
            per_page: res.pagination.per_page,
            last_page: res.pagination.last_page,
            next_page_url: res.pagination.next_page_url,
            prev_page_url: res.pagination.prev_page_url,
          });
          resolve({ message: "Successfully Listed!" });
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
  updateDiary: async (id: string, formData: FormData) =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.diaryUpdating(id, formData)
        .then((res) => {
          set((state) => ({ diaries: [...state.diaries, res] }));
          resolve({ message: "Successfully Updated!" });
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          set({ isLoading: false });
        });
    }),
}));
