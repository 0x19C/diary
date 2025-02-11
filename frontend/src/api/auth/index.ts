import {
  axios,
  SERVER_ERROR,
  getCSRFToken,
  type COMMON_RESPONSE,
} from "@/api/common";

interface UserResponseData {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
}

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

export const whoAmI = async () => {
  await getCSRFToken();
  return new Promise<COMMON_RESPONSE<UserResponseData>>((resolve, reject) => {
    axios
      .get("/api/user")
      .then(
        (res: {
          data: {
            id: string;
            username: string;
            email: string;
            is_admin: boolean;
          };
        }) => {
          resolve({
            data: res.data,
            message: "Successfully Registered!",
          });
        }
      )
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
