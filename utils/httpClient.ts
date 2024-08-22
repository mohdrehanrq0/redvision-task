import axios from "axios";
import Router from "next/router";

// const BASE_URL = "http://localhost:4000/api/v1/";
const BASE_URL =
  "https://redvision-task-backend-production.up.railway.app/api/v1/";
export const HEADERS = {
  "Content-Type": "application/json",
};
const FILE_UPLOAD_ENDPOINTS = ["/blog/upload"];

// no required because backend handle auth token in cookies
// Client for Organziation (No Token)
// export const UnAuthHttpClient = axios.create({
//   baseURL: `${BASE_URL}`,
//   headers: {
//     ...HEADERS,
//   },
// });

// UnAuthHttpClient.interceptors.response.use(
//   (res) => {
//     return Promise.resolve(res);
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
/*****************************************/

// Client for Authenticated User
export const AuthUserHttpClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    ...HEADERS,
  },
});

AuthUserHttpClient.interceptors.request.use(
  async (config) => {
    config.withCredentials = true;
    if (FILE_UPLOAD_ENDPOINTS.includes(config.url as string)) {
      config.headers["Content-Type"] = "multipart/form-data";
      // console.log('multipart form data ===================');
    }

    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

AuthUserHttpClient.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  async (error) => {
    // if (error?.response?.status === 401 && typeof window !== "undefined") {
    //   Router.push("/login");
    //   console.log("unauthenticated============");
    // }
    return Promise.reject(error);
  }
);
