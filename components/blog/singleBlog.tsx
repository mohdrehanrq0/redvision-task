import { useRouter } from 'next//navigation';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { GlobalContext } from '@/context/globalContext/globalContext';
import { TGlobalContext } from '@/context/globalContext/interface';
import { deleteBlog, getSpecificBlogs } from '@/services/blog';

import { TBlogData } from './blogWrapper';

const SingleBlog = () => {
  const [data, setData] = useState<TBlogData | undefined>();
  const { user } = useContext(GlobalContext) as TGlobalContext;
  const searchParam = useParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParam && searchParam.slug) {
      getSpecificBlogs(
        String(searchParam.slug),
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
  }, [searchParam]);

  const handleDeleteBlog = () => {
    let con = confirm("Are you sure you want to delete.");

    if (con && data) {
      deleteBlog(
        data._id,
        (res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success("Blog deleted successfully.");
            router.push("/blogs");
          }
        },
        (err) => {
          console.log(err);
          err.response.data.message &&
            toast.error(err.response.data.message, {});
        }
      );
    }
  };

  return (
    <div className="grid md:grid-cols-2 items-center md:gap-4 gap-8 font-[sans-serif] px-32 mx-auto mt-10">
      <div className="max-md:order-1 max-md:text-center">
        <p
          className="mb-4 text-blue-700 cursor-pointer"
          onClick={() => router.push("/blogs")}
        >
          Back
        </p>
        <h3 className="text-gray-800 md:text-3xl text-2xl md:leading-10 mb-2">
          {data?.title}
        </h3>
        <h6 className="text-gray-700 md:text-xl text-base md:leading-10 mb-2">
          {data?.subtitle}
        </h6>
        <p className="mt-4 text-sm text-gray-600">{data?.content}</p>
        {user.role === "admin" ? (
          <div className="mt-5 flex gap-7">
            {/* <button
              type="button"
              className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
            >
              Edit Blog
            </button> */}
            <button
              type="button"
              className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-red-700 hover:bg-red-800 active:bg-red-700"
              onClick={() => handleDeleteBlog()}
            >
              Delete Blog
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="md:h-[300px] ">
        {data?.image ? (
          <Image
            src={String(data?.image)}
            className="w-full h-full md:object-contain"
            alt=""
            width={100}
            height={100}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
