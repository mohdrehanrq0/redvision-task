import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { TBlogData } from "./blogWrapper";

const BlogCard = ({ data }: { data: TBlogData }) => {
  const router = useRouter();
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif]  border-2">
      <div className="h-[200px] border-b-2">
        <Image
          src={data.image}
          className="w-full h-[200px] object-cover"
          width={100}
          height={200}
          alt=""
        />
      </div>

      <div className="p-6">
        <h3 className="text-gray-800 text-xl font-bold">{data.title}</h3>
        <h3 className="text-gray-700 text-base mt-2 font-semibold line-clamp-2">
          {data.subtitle}
        </h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
          {data.content}
        </p>
        <button
          type="button"
          className="mt-6 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          onClick={() => router.push(`/blogs/${data.slug}`)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
