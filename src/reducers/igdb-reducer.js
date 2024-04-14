import { ActionTypes } from '../actions';

const initialState = {
  searchResults: [],
};

const igdbReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SEARCH_GAMES:
      return { searchResults: action.payload };
    default:
      return state;
  }
};

export default igdbReducer;
