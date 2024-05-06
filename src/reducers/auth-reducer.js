import { ActionTypes } from '../actions';
import { signOutSuccess } from '../utils/text-utils';

const initialState = {
  authenticated: false,
  user: {},
  msg: '',
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, user: action.payload, msg: action.msg };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, user: {}, msg: signOutSuccess };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, user: {}, msg: action.msg };
    default:
      return state;
  }
};

export default authReducer;
