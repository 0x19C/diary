import Axios from "axios";

const API_SERVER_URL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_INTER_BACKEND_API_URL
    : process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const axios = Axios.create({
  baseURL: API_SERVER_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export const SERVER_ERROR = {
  error: "server_error",
  message: "サーバエラー",
};

export const getCSRFToken = async () => {
  return new Promise<boolean>((resolve, _) => {
    axios
      .get("/sanctum/csrf-cookie")
      .then((_) => {
        resolve(true);
      })
      .catch((_) => {
        resolve(false);
      });
  });
};

export type Diary = {
  id: string;
  entry_date: string;
  summary: string;
  file_path: string;
}

export type COMMON_RESPONSE<T> = {
  data: T;
  message: string;
};