import axios from 'axios';
import { AWS_PROXY_KEY, AWS_PROXY_URL } from '../common/igdb';

// API keys
const ROOT_URL = 'http://localhost:9090/api';
// const API_KEY = '?key=bigwarlett';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  ERROR_SET: 'ERROR_SET',

  // IGDB ActionTypes
  SEARCH_GAMES: 'SEARCH_GAMES',
};

export function fetchGames() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // (arg) => { } is a function
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, use it in a separate error reducer
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, message: error });
      });
  };
}

// fetch individual game data when clicking on a game in the list
export function fetchGame(id, navigate) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`)
      .then((response) => {
        // navigate to the correct place
        navigate(`/games/${id}`);
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, message: error });
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

    axios.post(`${ROOT_URL}/posts`, fields, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        navigate('/');
      })
      .catch((error) => {
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, message: error });
        // add an ERROR_CLEAR action?
      });
  };
}

// update game information when clicking the save button
export function updateGame(id, navigate, newTitle) {
  return (dispatch) => {
    const fields = { title: newTitle };
    // update the game
    axios.put(`${ROOT_URL}/posts/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, message: error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

// delete an individual game when clicking the delete button
export function deleteGame(id, navigate) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        // navigate to the games page
        navigate('/');
      })
      .catch((error) => {
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, message: error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, navigate) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument
  return (dispatch) => {
    const fields = {
      email, password,
    };
    // does an axios.post on the /signin endpoint and passes in { email, password}
    axios.post(`${ROOT_URL}/signin`, fields)
      .then((response) => {
        // on success does:
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);

        // navigate to the homepage
        navigate('/');
      })
      .catch((error) => {
        // on error should
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
      });
  };
}

export function signupUser({ email, password }, navigate) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument
  return (dispatch) => {
    const fields = {
      email, password,
    };
    // does an axios.post on the /signin endpoint and passes in { email, password}
    axios.post(`${ROOT_URL}/signup`, fields)
      .then((response) => {
        // on success does:
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);

        // navigate to the homepage
        navigate('/');
      })
      .catch((error) => {
        // on error should
        dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(navigate) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    navigate('/');
  };
}

// searchTerm = the string to search for
export function searchGames(searchTerm) {
  return (dispatch) => {
    // data = API query. From the IGDB example here: https://api-docs.igdb.com/#examples
    const data = `search "${searchTerm}"; fields name;`;

    // Need to have x-api-key in the headers, with our proxy key.
    // Just use this for all of your requests
    const headers = {
      'x-api-key': AWS_PROXY_KEY,
    };

    // Axios sends a request to our proxy
    // MAKE SURE TO PUT THE HEADERS LAST
    axios.post(AWS_PROXY_URL, data, {
      headers,
    }).then((response) => {
      console.log('search response');
      console.log(response.data);
      // If we get a response, we dispatch the SEARCH_GAMES action, and send the results to our reducer
      dispatch({ type: ActionTypes.SEARCH_GAMES, payload: response.data });
    }).catch((error) => {
      console.log('search error');
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}
