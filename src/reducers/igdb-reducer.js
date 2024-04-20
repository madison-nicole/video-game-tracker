import { ActionTypes } from '../actions';

const initialState = {
  results: '',
};

const IGDBReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.IGDB_SEARCH:
      return state;
    default:
      return state;
  }
};

export default IGDBReducer;
