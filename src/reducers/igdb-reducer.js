import { ActionTypes } from '../actions';

const initialState = {
  results: [],
  topRatedGames: [],
  topRatedCovers: new Map(),
};

const IGDBReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.IGDB_SEARCH:
      return { ...state, results: action.payload };
    case ActionTypes.IGDB_TOP_RATED:
      return { ...state, topRatedGames: action.games, topRatedCovers: action.covers };
    default:
      return state;
  }
};

export default IGDBReducer;
