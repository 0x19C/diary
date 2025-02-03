import {
  axios,
  SERVER_ERROR,
  getCSRFToken,
  type COMMON_RESPONSE,
} from "@/api/common";
import { AxiosHeaders } from "axios";

export const loginWithCredential = async (formData: FormData) => {
  await getCSRFToken();
  return new Promise<COMMON_RESPONSE<unknown>>((resolve, reject) => {
    axios
      .post("/login", formData)
      .then((_) => {
        resolve({
          data: null,
          message: "Login Success!",
        });
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

export const registerWithCredential = async (formData: FormData) => {
  await getCSRFToken();
  return new Promise<COMMON_RESPONSE<unknown>>((resolve, reject) => {
    axios
      .post("/register", formData)
      .then((_) => {
        resolve({
          data: null,
          message: "Successfully Registered!",
        });
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

export const logout = async () => {
  await getCSRFToken();
  return new Promise<COMMON_RESPONSE<unknown>>((resolve, reject) => {
    axios
      .post("/logout")
      .then((_) => {
        resolve({
          data: null,
          message: "Successfully Logged out!",
        });
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

export const whoAmI = async (headers: AxiosHeaders) => {
  await getCSRFToken();
  return new Promise<COMMON_RESPONSE<unknown>>((resolve, reject) => {
    axios
      .get("/api/user", {
        headers
      })
      .then(
        (res: {
          data: {
            id: string;
            username: string;
            email: string;
            is_admin: boolean;
          };
        }) => {
          console.log({res})
          resolve({
            data: res.data,
            message: "Successfully Registered!",
          });
        }
      )
      .catch((e) => {
        console.log({e})
        try {
          const { data } = e.response;
          reject(data);
        } catch (_) {
          reject(SERVER_ERROR);
        }
      });
  });
};
