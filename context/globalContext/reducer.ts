import globalActions from './actionTypes';
import { TAction, TGlobalStates, TUser } from './interface';

const globalReducer = (
  state: TGlobalStates,
  action: TAction
): TGlobalStates => {
  switch (action.type) {
    case globalActions.SET_USER: {
      return {
        ...state,
        user: action.payload as TUser,
      };
    }
    default:
      return state;
  }
};

export default globalReducer;
