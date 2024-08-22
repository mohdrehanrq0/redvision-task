"use client";
import { subtle } from 'crypto';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { GlobalContext } from '@/context/globalContext/globalContext';
import { TGlobalContext } from '@/context/globalContext/interface';
import { createBlog, uploadImage } from '@/services/blog';

const AddBlog = () => {
  const router = useRouter();
  const { user } = useContext(GlobalContext) as TGlobalContext;
  const [data, setData] = useState<{
    title?: string;
    subtitle?: string;
    content?: string;
    image?: string;
  }>({
    title: undefined,
    subtitle: undefined,
    content: undefined,
    image: undefined,
  });
  const customId = "custom-id-blog";

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files![0];
    if (file) {
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
          }
        },
        (err) => {
          console.log(err);
          err.response.data.message &&
            toast.error(err.response.data.message, {
              toastId: customId,
            });
        }
      );
    }
  };

  const handleAddBlogClick = () => {
    if (
      data.title &&
      data.subtitle &&
      data.content &&
      data.image &&
      data.title !== "" &&
      data.subtitle !== "" &&
      data.content !== "" &&
      data.image !== ""
    ) {
      let payload = {
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        image: data.image,
        userId: String(user._id),
      };
      createBlog(
        payload,
        (res) => {
          if (res.status === 200) {
            toast.success("Blog added successfully", {
              toastId: customId,
            });
            router.push("/blogs");
          }
        },
        (err) => {
          console.log(err);
          err.response.data.message &&
            toast.error(err.response.data.message, {
              toastId: customId,
            });
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
                onClick={() => router.push("/blogs")}
              >
                Back
              </p>
              <h2 className="text-gray-800 text-center text-2xl font-bold">
                Add Blog
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
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg disabled:bg-gray-500 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={
                    !(
                      data.title &&
                      data.subtitle &&
                      data.content &&
                      data.image &&
                      data.title !== "" &&
                      data.subtitle !== "" &&
                      data.content !== "" &&
                      data.image !== ""
                    )
                  }
                  onClick={handleAddBlogClick}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
