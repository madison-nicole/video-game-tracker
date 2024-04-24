import { ActionTypes } from '../actions';

const initialState = {
  results: [],
  topRated: [],
};

const IGDBReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.IGDB_SEARCH:
      return { ...state, results: action.payload };
    case ActionTypes.IGDB_TOP_RATED:
      return { ...state, topRated: action.payload };
    default:
      return state;
  }
};

export default IGDBReducer;
