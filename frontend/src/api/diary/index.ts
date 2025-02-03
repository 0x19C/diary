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

export const diaryListing = async () => {
  await getCSRFToken();

  return new Promise<{
    data: Diary[],
    pagination: {
      total: number,
      current_page: number
    }
  }>((resolve, reject) => {
    axios
      .get("/api/diaries")
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
