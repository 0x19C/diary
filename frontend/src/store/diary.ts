import { create } from "zustand";
import * as API from "@/api/diary";
import { type Diary } from "@/api/common";

type IStoreError = { error: string; message: string } | null | undefined;

export interface IDiaryStore {
  isLoading: boolean;
  diaries: Diary[];
  total: number;
  current_page: number;
  error: IStoreError;
  createDiary(formData: FormData): Promise<{ message: string }>;
  listDiary(): Promise<{ message: string }>;
  updateDiary(id: string, formData: FormData): Promise<{ message: string }>;
}

export const useDiaryStore = create<IDiaryStore>((set) => ({
  isLoading: false,
  diaries: [],
  total: 0,
  current_page: 1,
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
  listDiary: async () =>
    new Promise((resolve, reject) => {
      set({ isLoading: true });
      API.diaryListing()
        .then((res) => {
          set((state) => ({
            diaries: [...state.diaries, ...res.data],
            total: res.pagination.total,
            current_page: res.pagination.current_page,
          }));
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
