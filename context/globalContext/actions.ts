import globalActions from './actionTypes';
import { TAction, TUser } from './interface';

export const setUser = (userData: TUser): TAction => ({
  type: globalActions.SET_USER,
  payload: userData,
});
