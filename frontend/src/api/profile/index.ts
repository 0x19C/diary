import { axios, SERVER_ERROR, getCSRFToken } from "@/api/common";
import { AxiosResponse } from "axios";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  is_admin: number;
}

export const getProfile = async () => {
  await getCSRFToken();

  return new Promise<UserProfile>((resolve, reject) => {
    axios
      .get(`/api/profile`)
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
  })
}

export const updateProfile = async (name: string) => {
  await getCSRFToken();

  return new Promise<UserProfile>((resolve, reject) => {
    axios
      .put(`/api/profile`, {
        name: name
      })
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
      })
  })
}

export const changePassword = async (current_password: string, new_password: string, new_password_confirmation: string) => {
  await getCSRFToken();

  return new Promise<UserProfile>((resolve, reject) => {
    axios
      .put(`/api/profile/password`, {
        "current_password": current_password,
        "new_password": new_password,
        "new_password_confirmation": new_password_confirmation
      })
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
      })
  })
}

