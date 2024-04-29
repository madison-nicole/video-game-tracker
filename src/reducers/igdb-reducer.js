import { ActionTypes } from '../actions';

const initialState = {
  results: [],
  topRatedGames: [],
  topRatedCovers: new Map(),
  selectedGame: null,
};

const IGDBReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.IGDB_SEARCH:
      return { ...state, results: action.payload };
    case ActionTypes.IGDB_TOP_RATED:
      return { ...state, topRatedGames: action.games, topRatedCovers: action.covers };
    case ActionTypes.SELECT_GAME:
      return { ...state, selectedGame: action.payload };
    case ActionTypes.CLEAR_SELECTED_GAME:
      return { ...state, selectedGame: null };
    default:
      return state;
  }
};

export default IGDBReducer;
