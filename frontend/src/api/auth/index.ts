import Axios, { AxiosResponse } from "axios";
import { API_SERVER_URL } from "@/api/constants";

const axios = Axios.create({
  baseURL: API_SERVER_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

const SERVER_ERROR = {
  error: "server_error",
  message: "サーバエラー",
};

const getCSRFToken = async () => {
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

export const loginWithCredential = async (params: {
  email: string;
  password: string;
}) => {
  await getCSRFToken();
  const formData = new FormData();
  formData.append("email", params.email);
  formData.append("password", params.password);
  formData.append("remember", "1");

  return new Promise<any>((resolve, reject) => {
    axios
      .post("/login", formData)
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

export const registerWithCredential = async (params: {
  name: string;
  email: string;
  password: string;
}) => {
  await getCSRFToken();
  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("email", params.email);
  formData.append("password", params.password);

  return new Promise<any>((resolve, reject) => {
    axios
      .post("/register", formData)
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

export const verifyToken = async () => {
  return new Promise<any>((resolve, reject) => {
    axios
      .get("/api/user")
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
