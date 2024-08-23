import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAllBlogs } from "@/services/blog";

import BlogCardSkeleton from "../skeleton/blogCardSkeleton";
import BlogCard from "./blogCard";

export interface TBlogData {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  slug: string;
}

const BlogWrapper = () => {
  const [blog, setBlog] = useState<TBlogData[] | undefined>();

  useEffect(() => {
    getAllBlogs(
      (res) => {
        if (res.status === 200) {
          setBlog(res.data.blog);
        }
      },
      (err) => {
        console.log(err);
        err.response.data.message && toast.error(err.response.data.message, {});
      }
    );
  }, []);

  return (
    <>
      <h1 className="px-8 font-bold text-3xl mt-8">Latest Blogs</h1>
      <div className="p-8 grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blog ? (
          blog?.map((e, i) => <BlogCard key={i} data={e} />)
        ) : (
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </>
        )}
      </div>
    </>
  );
};

export default BlogWrapper;
