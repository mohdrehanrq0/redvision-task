"use client";
import React, { useContext } from 'react';

import SingleBlog from '@/components/blog/singleBlog';
import Navbar from '@/components/navbar/navbar';

const SingleBlogPage = () => {
  return (
    <>
      <Navbar /> <SingleBlog />
    </>
  );
};

export default SingleBlogPage;
