// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

export function FETCH_POST() {
  return {
    type: ActionTypes.FETCH_POST,
    payload: null,
  };
}

export function FETCH_POSTS() {
  return {
    type: ActionTypes.FETCH_POSTS,
    payload: null,
  };
}
