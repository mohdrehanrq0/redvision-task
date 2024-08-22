"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { signupService } from '@/services/user';

const Register = () => {
  const router = useRouter();
  const [data, setData] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({
    name: undefined,
    email: undefined,
    password: undefined,
  });
  const customId = "custom-id-register";

  const handleRegisterButtonClick = () => {
    if (
      data.name &&
      data.email &&
      data.password &&
      data.email !== "" &&
      data.password !== ""
    ) {
      signupService(
        { name: data.name, email: data.email, password: data.password },
        (res) => {
          if (res.status === 200) {
            toast.success("Register successfully, Please login to continue", {
              toastId: customId,
            });
            router.push("/login");
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
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Register
            </h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) =>
                      setData((pre) => ({ ...pre, name: e.target.value }))
                    }
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={data.email}
                    onChange={(e) =>
                      setData((pre) => ({ ...pre, email: e.target.value }))
                    }
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    value={data.password}
                    onChange={(e) =>
                      setData((pre) => ({ ...pre, password: e.target.value }))
                    }
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  disabled={
                    !(
                      data.name &&
                      data.email &&
                      data.password &&
                      data.name !== "" &&
                      data.email !== "" &&
                      data.password !== ""
                    )
                  }
                  onClick={handleRegisterButtonClick}
                  className="w-full disabled:bg-gray-600 py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Register
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
