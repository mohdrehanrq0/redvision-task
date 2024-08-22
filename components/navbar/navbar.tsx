"use client";
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

import { GlobalContext } from '@/context/globalContext/globalContext';
import { TGlobalStates } from '@/context/globalContext/interface';
import { logoutUserService } from '@/services/user';

const Navbar = () => {
  const router = useRouter();
  const { user } = useContext(GlobalContext) as TGlobalStates;

  const logoutUser = () => {
    logoutUserService(
      (res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("User LoggedOut Successfully");
          router.push("/login");
        }
      },
      (err) => {
        console.log(err);
        err.response.data.message && toast.error(err.response.data.message, {});
      }
    );
  };
  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-end gap-5 w-full">
        <div className="flex max-lg:ml-auto space-x-3">
          {user.role === "admin" ? (
            <button
              onClick={() => router.push("/blogs/add-blog")}
              className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
            >
              Add Blog
            </button>
          ) : (
            ""
          )}

          <button
            onClick={() => logoutUser()}
            className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
