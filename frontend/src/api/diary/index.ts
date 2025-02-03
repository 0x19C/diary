import { axios, SERVER_ERROR, getCSRFToken, type Diary } from "@/api/common";
import { AxiosResponse } from "axios";

export const diaryCreation = async (formData: FormData) => {
  await getCSRFToken();

  return new Promise<Diary>((resolve, reject) => {
    axios
      .post("/api/diaries", formData)
      .then((res: AxiosResponse) => {
        resolve(res.data);
      })
      .catch((e) => {
        try {
          const { data } = e.response;
          reject(data);
        } catch (_) {
          reject(SERVER_ERROR);
        }
      });
  });
};

export const diaryListing = async (page: number = 1, per_page: number = 5) => {
  await getCSRFToken();

  return new Promise<{
    data: Diary[];
    pagination: {
      total: number;
      current_page: number;
      per_page: number;
      last_page: number;
      next_page_url: string;
      prev_page_url: string;
    };
  }>((resolve, reject) => {
    axios
      .get(`/api/diaries?page=${page}&per_page=${per_page}`)
      .then((res: AxiosResponse) => {
        resolve(res.data);
      })
      .catch((e) => {
        try {
          const { data } = e.response;
          reject(data);
        } catch (_) {
          reject(SERVER_ERROR);
        }
      });
  });
};

export const diaryDetailing = async (id: string) => {
  await getCSRFToken();

  return new Promise<Diary>((resolve, reject) => {
    axios
      .get(`/api/diaries/${id}`)
      .then((res: AxiosResponse) => {
        resolve(res.data);
      })
      .catch((e) => {
        try {
          const { data } = e.response;
          reject(data);
        } catch (_) {
          reject(SERVER_ERROR);
        }
      });
  });
};

export const diaryUpdating = async (id: string, formData: FormData) => {
  await getCSRFToken();

  return new Promise<Diary>((resolve, reject) => {
    axios
      .patch(`/api/diaries/${id}`, formData)
      .then((res: AxiosResponse) => {
        resolve(res.data);
      })
      .catch((e) => {
        try {
          const { data } = e.response;
          reject(data);
        } catch (_) {
          reject(SERVER_ERROR);
        }
      });
  });
};
