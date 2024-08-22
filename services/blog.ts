import { AxiosResponse } from 'axios';

import { AuthUserHttpClient } from '@/utils/httpClient';

const PATH = {
  allBlogs: "/blog/get-all",
  uploadImage: "/blog/upload",
  createBlog: "/blog/create",
  updateBlog: "blog//update/",
  deleteBlog: "/blog/delete/",
  specificBlog: "/blog/",
};

const createBlog = (
  payload: {
    title: string;
    subtitle: string;
    content: string;
    userId: string;
    image: string;
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
  return AuthUserHttpClient.post(`${PATH.createBlog}`, payload)
    .then(callback)
    .catch(error);
};

const updateBlog = (
  blogId: string,
  payload: {
    title?: string;
    subtitle?: string;
    content?: string;
    userId?: string;
    image?: string;
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
  return AuthUserHttpClient.put(`${PATH.updateBlog}${blogId}`, payload)
    .then(callback)
    .catch(error);
};

const deleteBlog = (
  blogId: string,
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
  return AuthUserHttpClient.delete(`${PATH.deleteBlog}${blogId}`)
    .then(callback)
    .catch(error);
};

const uploadImage = (
  payload: FormData,
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
  return AuthUserHttpClient.post(`${PATH.uploadImage}`, payload)
    .then(callback)
    .catch(error);
};

const getAllBlogs = (
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
  return AuthUserHttpClient.get(`${PATH.allBlogs}`).then(callback).catch(error);
};

const getSpecificBlogs = (
  slug: string,
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
  return AuthUserHttpClient.get(`${PATH.specificBlog}/${slug}`)
    .then(callback)
    .catch(error);
};

export {
  updateBlog,
  deleteBlog,
  createBlog,
  getAllBlogs,
  uploadImage,
  getSpecificBlogs,
};
