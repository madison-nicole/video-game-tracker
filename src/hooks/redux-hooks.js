import { useSelector } from 'react-redux';

/**
 * Function will check whether or not a user is signed in
 * @returns a boolean value which indicates true if authenticated
 */
export function useAuthenticated() {
  return useSelector((reduxState) => reduxState.auth.authenticated);
}

/**
 * @returns an object with data for the top 100 rated games
 */
export function useTopRated() {
  return useSelector((reduxState) => reduxState.igdb?.topRated);
}

/**
 * @returns an object with data for the selected game
 */
export function useSelectedGame() {
  return useSelector((reduxState) => reduxState.igdb?.selectedGame);
}

/**
 * @returns an object with data for the search results
 */
export function useSearchResults() {
  return useSelector((reduxState) => reduxState.igdb?.results);
}

/**
 * @returns an object with data for the search results preview
 */
export function useSearchResultsPreview() {
  return useSelector((reduxState) => reduxState.igdb?.resultsPreview);
}

/**
 * @returns an object with data for the user
 */
export function useUserInfo() {
  return useSelector((reduxState) => reduxState.auth.user);
}
