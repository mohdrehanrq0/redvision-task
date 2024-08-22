import { AxiosResponse } from 'axios';

import { AuthUserHttpClient } from '@/utils/httpClient';

const PATH = {
  login: "/user/login",
  signup: "/user/signup",
  getUser: "/user",
  logout: "/user/logout",
};

const loginService = (
  payload: {
    email: string;
    password: string;
  },
  callback:
    | ((
        value: AxiosResponse<any, any>
      ) =>
        | AxiosResponse<any, any>
        | void
        | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined,
  error: ((reason: any) => PromiseLike<never> | void) | null | undefined
) => {
  return AuthUserHttpClient.post(`${PATH.login}`, payload)
    .then(callback)
    .catch(error);
};

const signupService = (
  payload: {
    email: string;
    password: string;
    name: string;
  },
  callback:
    | ((
        value: AxiosResponse<any, any>
      ) =>
        | AxiosResponse<any, any>
        | void
        | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined,
  error: ((reason: any) => PromiseLike<never> | void) | null | undefined
) => {
  return AuthUserHttpClient.post(`${PATH.signup}`, payload)
    .then(callback)
    .catch(error);
};

const getUserDetails = (
  callback:
    | ((
        value: AxiosResponse<any, any>
      ) =>
        | AxiosResponse<any, any>
        | void
        | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined,
  error: ((reason: any) => PromiseLike<never> | void) | null | undefined
) => {
  return AuthUserHttpClient.get(`${PATH.getUser}`).then(callback).catch(error);
};

const logoutUserService = (
  callback:
    | ((
        value: AxiosResponse<any, any>
      ) =>
        | AxiosResponse<any, any>
        | void
        | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined,
  error: ((reason: any) => PromiseLike<never> | void) | null | undefined
) => {
  return AuthUserHttpClient.get(`${PATH.logout}`).then(callback).catch(error);
};

export { loginService, signupService, getUserDetails, logoutUserService };
