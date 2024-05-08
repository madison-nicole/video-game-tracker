import { ActionTypes } from '../actions';

const initialState = {
  userInfo: {},
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_INFO:
      return { userInfo: action.payload };
    default:
      return state;
  }
};

export default userReducer;
