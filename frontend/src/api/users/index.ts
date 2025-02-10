import { axios, SERVER_ERROR, getCSRFToken, type Diary, User } from "@/api/common";
import { AxiosResponse } from "axios";



export const userListing = async (page: number = 1, per_page: number = 5) => {
  await getCSRFToken();

  return new Promise<{
    data: User[];
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
      .get(`/api/users?page=${page}&per_page=${per_page}`)
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


export const userDeleting = async (id: string) => {
  await getCSRFToken();
  return new Promise<Diary>((resolve, reject) => {
    axios
    .delete(`/api/users/${id}`)
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
