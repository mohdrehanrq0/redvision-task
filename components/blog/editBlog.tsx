"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { GlobalContext } from "@/context/globalContext/globalContext";
import { TGlobalContext } from "@/context/globalContext/interface";
import {
  createBlog,
  getSpecificBlogs,
  updateBlog,
  uploadImage,
} from "@/services/blog";

interface IBlogData {
  _id?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  slug?: string;
  userId?: string;
}

const EditBlog = () => {
  const router = useRouter();
  const param = useParams();
  const { user } = useContext(GlobalContext) as TGlobalContext;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IBlogData>({});
  const customId = "custom-id-blog";

  useEffect(() => {
    if (param.slug) {
      getSpecificBlogs(
        String(param.slug),
        (res) => {
          if (res.status === 200) {
            setData(res.data.blog);
          }
        },
        (err) => {
          console.log(err);
          err.response.data.message &&
            toast.error(err.response.data.message, {});
        }
      );
    }
  }, [param]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files![0];
    if (file) {
      setLoading(true);
      const payload = new FormData();
      payload.append("file", file);
      toast.info("Please wait while image is uploading...", {
        toastId: customId,
      });
      uploadImage(
        payload,
        (res) => {
          if (res.status === 200) {
            setData((pre) => ({ ...pre, image: res.data.url }));
            setLoading(false);
          }
        },
        (err) => {
          console.log(err);
          err.response.data.message &&
            toast.error(err.response.data.message, {
              toastId: customId,
            });
          setLoading(false);
        }
      );
    }
  };

  const handleUpdateBlogClick = () => {
    if (
      data?.title !== "" &&
      data?.subtitle !== "" &&
      data?.content !== "" &&
      data?.image !== ""
    ) {
      setLoading(true);
      let payload = {
        title: data.title as string,
        subtitle: data.subtitle as string,
        content: data.content as string,
        image: data.image as string,
        userId: String(user._id),
      };
      updateBlog(
        data._id as string,
        payload,
        (res) => {
          if (res.status === 200) {
            toast.success("Blog updated successfully", {
              toastId: customId,
            });
            router.push(`/blogs/${param.slug}`);
            setLoading(false);
          }
        },
        (err) => {
          console.log(err);
          err.response.data.message &&
            toast.error(err.response.data.message, {
              toastId: customId,
            });
          setLoading(false);
        }
      );
    }
  };
  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <div>
              <p
                className="absolute text-blue-700 cursor-pointer"
                onClick={() => router.push(`/blogs/${param.slug}`)}
              >
                Back
              </p>
              <h2 className="text-gray-800 text-center text-2xl font-bold">
                Update Blog
              </h2>
            </div>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Title
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) =>
                      setData((pre) => ({ ...pre, title: e.target.value }))
                    }
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter your blog title"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Sub Title
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={data.subtitle}
                    onChange={(e) =>
                      setData((pre) => ({ ...pre, subtitle: e.target.value }))
                    }
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Content
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={data.content}
                    onChange={(e) =>
                      setData((pre) => ({ ...pre, content: e.target.value }))
                    }
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Image
                </label>
                <div className="relative flex items-center">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageUpload}
                    className="w-full text-gray-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-blue-600 file:hover:bg-blue-700 file:text-white rounded"
                  />
                </div>
                <div className="mt-2">
                  {data?.image ? (
                    <Image
                      src={String(data?.image)}
                      width="120"
                      height={100}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg disabled:bg-gray-500 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                  onClick={handleUpdateBlogClick}
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    "Update Blog"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
