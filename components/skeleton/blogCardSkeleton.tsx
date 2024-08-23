import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif]  border-2 animate-pulse">
      <div className="h-[200px] bg-gray-200 rounded w-auto "></div>
      <div className="p-6">
        <div className="h-5 bg-gray-200 rounded-full max-w-auto mb-2.5"></div>
        <div className="h-5 bg-gray-200 rounded-full max-w-[150px] mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded-full w-24 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded-full w-auto mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full w-auto mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full w-auto mb-6"></div>
        <div className=" h-10 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
