import { Dispatch } from 'react';

export interface TUser {
  name: string | null;
  email: string | null;
  role: "user" | "admin" | null;
  _id: string | null;
}

export interface TAction {
  type: string;
  payload: TUser | string | null;
}

export interface TGlobalStates {
  user: TUser;
}

export interface TGlobalContext extends TGlobalStates {
  globalDispatch: Dispatch<TAction>;
}
