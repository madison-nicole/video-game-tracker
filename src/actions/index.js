import * as IGDB from '../api/igdb';
import { signInSuccess, signUpSuccess } from '../utils/text-utils';
import * as GameDex from '../api/gamedex';
import * as Twitch from '../api/twitch';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_USER_INFO: 'FETCH_USER_INFO',
  FETCH_USER_GAMES: 'FETCH_USER_GAMES',
  ERROR_SET: 'ERROR_SET',

  // IGDB Actions
  IGDB_SEARCH_PREVIEW: 'IGDB_SEARCH_PREVIEW',
  IGDB_SEARCH: 'IGDB_SEARCH',
  IGDB_TOP_RATED: 'IGDB_TOP_RATED',

  SELECT_GAME: 'SELECT_GAME',
  CLEAR_SELECTED_GAME: 'CLEAR_SELECTED_GAME',

  // Twitch Actions
  TWITCH_TRENDING: 'TWITCH_TRENDING',
};

export function fetchGames() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // (arg) => { } is a function
  return async (dispatch) => {
    try {
      const games = await GameDex.getGames();
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: games });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
  };
}

// fetch individual game data when clicking on a game in the list
export function fetchGame(id, navigate) {
  return async (dispatch) => {
    try {
      const game = await GameDex.getGame(id);
      navigate(`/games/${id}`);
      dispatch({ type: ActionTypes.FETCH_POST, payload: game });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
  };
}

// add the game to the database
export function addNewGame(title, navigate, userRating) {
  return async (dispatch) => {
    try {
      const fields = {
        title, rating: userRating, content: '', coverUrl: '', tags: '',
      };
      await GameDex.addGame(fields);
      navigate('/');
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
  };
}

// update game information when clicking the save button
export function updateGame(id, navigate, newTitle) {
  return async (dispatch) => {
    try {
      const fields = {
        title: newTitle, rating: '', content: '', coverUrl: '', tags: '',
      };
      const game = await GameDex.updateGame(fields);
      dispatch({ type: ActionTypes.FETCH_POST, payload: game });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
  };
}

// delete an individual game when clicking the delete button
export function deleteGame(id, navigate) {
  return async (dispatch) => {
    try {
      await GameDex.deleteGame(id);
      navigate('/');
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
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

export function signinUser({ emailOrUsername, password }, navigate) {
  // takes in an object with emailOrUsername and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument
  return async (dispatch) => {
    try {
      const fields = {
        emailOrUsername, password,
      };
      const { token, user } = await GameDex.signin(fields);
      dispatch({ type: ActionTypes.AUTH_USER, payload: user, msg: signInSuccess });
      localStorage.setItem('token', token);
    } catch (error) {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    }
  };
}

export function signupUser({ username, email, password }, navigate) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument
  return async (dispatch) => {
    try {
      const fields = {
        username, email, password,
      };
      const token = await GameDex.signup(fields);
      dispatch({ type: ActionTypes.AUTH_USER, payload: { username, email }, msg: signUpSuccess });
      localStorage.setItem('token', token);
    } catch (error) {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    }
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

// Search games preview = quick results for the search bar dropdown
export function searchGamesPreview(searchTerm) {
  return (dispatch) => {
    const query = `search "${searchTerm}"; fields name, rating, cover, franchise, genres, summary, release_dates; where version_parent = null & rating_count > 0;`;

    IGDB.fetchGames(query).then((games) => {
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({ type: ActionTypes.IGDB_SEARCH_PREVIEW, payload: games });
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}

// Search games = full results for the results page
export function searchGames(searchTerm) {
  return async (dispatch) => {
    // query
    const query = `search "${searchTerm}"; fields name, rating, rating_count, cover, franchise, genres, summary, release_dates; where version_parent = null & rating_count > 0;`;

    try {
    // First, request games for the given search term
      const games = await IGDB.fetchGames(query);

      // Then, fetch game covers and years for the games
      // Original request only returns IDs for covers and years
      const covers = await IGDB.fetchGameCovers(games);
      const years = await IGDB.fetchGameReleaseYears(games);
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({
        type: ActionTypes.IGDB_SEARCH, games, covers, years,
      });
    } catch (error) {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    }
  };
}

// IGDB TOP RATED GAMES ACTION
export function fetchTopRatedGames() {
  return (dispatch) => {
    const query = 'fields name, rating, cover, franchise, genres, summary, release_dates; sort rating desc; where rating_count > 400 & version_parent = null; limit 100;';

    IGDB.fetchGames(query).then(async (games) => {
      const covers = await IGDB.fetchGameCovers(games);
      const years = await IGDB.fetchGameReleaseYears(games);
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({
        type: ActionTypes.IGDB_TOP_RATED, games, covers, years,
      });
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}

export function selectGame(game, coverUrl, year) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SELECT_GAME, payload: { ...game, coverUrl, year } });
  };
}

export function selectGameAndLoadData(game) {
  return async (dispatch) => {
    const coverUrl = await IGDB.fetchGameCoverUrl(game.cover);
    const year = await IGDB.fetchGameReleaseYear(game.release_dates[0]);

    dispatch({ type: ActionTypes.SELECT_GAME, payload: { ...game, coverUrl, year } });
  };
}

export function clearSelectedGame() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_SELECTED_GAME });
  };
}

export function getUserInfo(username) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument
  return async (dispatch) => {
    try {
      const user = await GameDex.fetchUserInfo(username);

      dispatch({ type: ActionTypes.FETCH_USER_INFO, payload: user });
    } catch (error) {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    }
  };
}

export function fetchUserGames(username) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument
  return async (dispatch) => {
    try {
      const games = await GameDex.getUserGames(username);

      dispatch({ type: ActionTypes.FETCH_USER_GAMES, payload: games });
    } catch (error) {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    }
  };
}

export function fetchTrendingGames() {
  return async (dispatch) => {
    try {
      const games = await Twitch.getTrendingGames();
      dispatch({ type: ActionTypes.TWITCH_TRENDING, payload: games });
    } catch (error) {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);

      // Re-auth Twitch and try again
      try {
        // Delete old token, attempt to fetch a new token
        localStorage.removeItem('twitchToken');
        const twitchToken = await Twitch.getAccessToken();
        localStorage.setItem('twitchToken', twitchToken);

        // Fetch trending games
        const games = await Twitch.getTrendingGames();
        dispatch({ type: ActionTypes.TWITCH_TRENDING, payload: games });
      } catch (err) {
        console.log('error', err);
      }
    }
  };
}
