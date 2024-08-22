"use client";
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useReducer, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { getUserDetails } from '@/services/user';

import { setUser } from './actions';
import { TGlobalStates } from './interface';
import globalReducer from './reducer';

export const GlobalContext = createContext({});
GlobalContext.displayName = "GlobalContext";

interface TProps {
  states?: TGlobalStates;
  children: JSX.Element;
}

const initialState = {
  user: {
    email: null,
    name: null,
    _id: null,
    role: null,
  },
};

const GlobalContextProvider = ({ children }: TProps) => {
  const [globalStates, globalDispatch] = useReducer(
    globalReducer,
    initialState
  );
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (router) {
      getUserDetails(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            globalDispatch(setUser(res.data.user));
            router.push("/blogs");
          }
        },
        (err) => {
          if (err?.response?.status === 401) {
            router.replace("/login");
          }
          console.log(err);
        }
      );
    }
  }, [router]);

  return !loading ? (
    <GlobalContext.Provider
      value={{
        ...globalStates,
        globalDispatch,
      }}
    >
      <>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    </GlobalContext.Provider>
  ) : (
    <>Loading...</>
  );
};

export default GlobalContextProvider;
