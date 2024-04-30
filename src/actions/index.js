import axios from 'axios';

// API keys
const ROOT_URL = 'http://localhost:9090/api';
const IGDB_GAMES_URL = 'https://kg0tnhf3p2.execute-api.us-west-2.amazonaws.com/production/v4/games';
const IGDB_COVERS_URL = 'https://kg0tnhf3p2.execute-api.us-west-2.amazonaws.com/production/v4/covers';
const API_KEY = 'o228NXPSSC2PvDrXAM3Xw5bYz6oOnFAN7XR4UTti';

// IGDB API header
const IGDB_HEADERS = { 'x-api-key': API_KEY };

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

  SELECT_GAME: 'SELECT_GAME',
  CLEAR_SELECTED_GAME: 'CLEAR_SELECTED_GAME',
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
    const data = `search "${searchTerm}"; fields name, rating, cover, franchise, genres, summary, release_dates;`;

    // Pretty much all of these endpoints use POST requests
    axios.post(IGDB_GAMES_URL, data, {
      headers: IGDB_HEADERS,
    }).then((response) => {
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({ type: ActionTypes.IGDB_SEARCH, payload: response.data });
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}

// Fetch covers from array of multiple games
export async function fetchGameCovers(games) {
  // Build cover query
  const coverIds = games.map((game) => {
    return game.cover;
  });

  const query = `fields url; where id=(${coverIds.toString()}); limit 100;`;

  // Fetch cover art for each game
  const response = await axios.post(IGDB_COVERS_URL, query, {
    headers: IGDB_HEADERS,
  });
  return new Map(response.data.map((cover) => [cover.id, cover.url]));
}

// Fetch cover for a single game
export async function fetchGameCover(coverId) {
  const query = `fields url; where id = ${coverId};`;

  // Fetch cover art for the game
  const response = await axios.post(IGDB_COVERS_URL, query, {
    headers: IGDB_HEADERS,
  });

  return response.data;
}

// IGDB TOP RATED GAMES ACTION
export function fetchTopRatedGames() {
  return (dispatch) => {
    // This is a really flexible API. You can supply whatever fields you want here.
    const data = 'fields name, rating, cover, franchise, genres, summary, release_dates; sort rating desc; where rating_count > 400 & version_parent = null; limit 100;';

    // Pretty much all of these endpoints use POST requests
    axios.post(IGDB_GAMES_URL, data, {
      headers: IGDB_HEADERS,
    }).then(async (response) => {
      const games = response.data;
      const covers = await fetchGameCovers(games);
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({ type: ActionTypes.IGDB_TOP_RATED, games, covers });
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}

export function selectGame(game, coverUrl) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SELECT_GAME, payload: { ...game, coverUrl } });
  };
}

export function selectGameAndLoadCover(game) {
  return (dispatch) => {
    fetchGameCover(game.cover).then((response) => {
      const cover = response.data;
      const coverUrl = `https://${cover[0].url.replace('thumb', 'cover_big')}`;
      dispatch({ type: ActionTypes.SELECT_GAME, payload: { ...game, coverUrl } });
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}

export function selectAndLoadGame(gameId) {
  return (dispatch) => {
    // Fields to get
    const data = `fields name, rating, cover, franchise, genres, summary, release_dates; where id = ${gameId};`;

    // Fetch data for the game
    axios.post(IGDB_GAMES_URL, data, {
      headers: IGDB_HEADERS,
    }).then(async (response) => {
      const game = response.data[0];

      // get the game cover
      const cover = await fetchGameCover(game.cover);
      const coverUrl = `https://${cover[0].url.replace('thumb', 'cover_big')}`;
      game.coverUrl = coverUrl;

      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({ type: ActionTypes.SELECT_GAME, payload: game });
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}

export function clearSelectedGame() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_SELECTED_GAME });
  };
}
