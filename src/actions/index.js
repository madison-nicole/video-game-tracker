import axios from 'axios';

// API keys
const ROOT_URL = 'http://localhost:9090/api';
const IGDB_URL = 'https://kg0tnhf3p2.execute-api.us-west-2.amazonaws.com/production/v4/games';
const API_KEY = 'o228NXPSSC2PvDrXAM3Xw5bYz6oOnFAN7XR4UTti';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  ERROR_SET: 'ERROR_SET',

  // IGDB Actions
  IGDB_SEARCH: 'IGDB_SEARCH',
  IGDB_TOP_RATED: 'IGDB_TOP_RATED',
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

// IGDB SEARCH ACTION
// searchTerm = the string to search for
export function searchGames(searchTerm, navigate) {
  return (dispatch) => {
    // This is a really flexible API. You can supply whatever fields you want here.
    const data = `search "${searchTerm}"; fields name;`;
    const headers = { 'x-api-key': API_KEY };

    // Pretty much all of these endpoints use POST requests
    axios.post(IGDB_URL, data, {
      headers,
    }).then((response) => {
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({ type: ActionTypes.IGDB_SEARCH, payload: response.data });
      navigate('/results'); // navigate to the search results page
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}

// IGDB TOP RATED GAMES ACTION
export function getTopRatedGames() {
  return (dispatch) => {
    // This is a really flexible API. You can supply whatever fields you want here.
    const data = 'fields *; sort rating desc; where rating_count > 20; where version_parent = null; limit 100;';
    const headers = { 'x-api-key': API_KEY };

    // Pretty much all of these endpoints use POST requests
    axios.post(IGDB_URL, data, {
      headers,
    }).then((response) => {
      console.log(response.data);
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({ type: ActionTypes.IGDB_TOP_RATED, payload: response.data });
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}
