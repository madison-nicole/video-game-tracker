import { ActionTypes } from '../actions';

const postsReducer = (state = 0, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_POST:
      return state + 1;
    case ActionTypes.FETCH_POSTS:
      return state - 1;
    default:
      return state;
  }
};

export default postsReducer;
