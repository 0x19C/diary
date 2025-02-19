import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export const SERVER_ERROR = {
  data: null,
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

export type User = {
  id: string;
  name: string;
  email: string;
  is_admin: number;
  created_at: string;
  updated_at: string;
}