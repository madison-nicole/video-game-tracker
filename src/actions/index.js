import axios from 'axios';

// API keys
const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = '?key=jeremywasham';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
};

export function fetchGames() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // (arg) => { } is a function
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        // dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

// fetch individual game data when clicking on a game in the list
export function fetchGame(id, navigate) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}?key=${API_KEY}`)
      .then((response) => {
        // navigate to the correct place
        navigate(`/games/${id}`);
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        // dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

// add the game to the database
export function addNewGame(title, navigate) {
  return (dispatch) => {
    // return the fields
    const fields = {
      title, content: '', coverUrl: '', tags: '',
    };

    axios.post(`${ROOT_URL}/posts${API_KEY}`, fields)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        // dispatch({ type: ActionTypes.ERROR_SET, error });
        // add an ERROR_CLEAR action?
      });
  };
}

// update game information when clicking the save button
export function updateGame(id, navigate, newTitle) {
  return (dispatch) => {
    const fields = { title: newTitle };
    // update the game
    axios.put(`${ROOT_URL}/posts/${id}?key=${API_KEY}`, fields)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        // dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

// delete an individual game when clicking the delete button
export function deleteGame(id, navigate) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}?key=${API_KEY}`)
      .then((response) => {
        // navigate to the games page
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        // dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}
