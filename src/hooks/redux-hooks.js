import { useSelector } from 'react-redux';

/**
 * Returns a boolean value which indicates true if authenticated
 * Function will check whether or not a user is signed in
 */
export function useAuthenticated() {
  return useSelector((reduxState) => reduxState.auth.authenticated);
}

/**
 * Returns an object with data for the top 100 rated games
 */
export function useTopRated() {
  return useSelector((reduxState) => reduxState.igdb?.topRated);
}

/**
 * Returns an object with data for the selected game
 */
export function useSelectedGame() {
  return useSelector((reduxState) => reduxState.igdb?.selectedGame);
}

/**
 * Returns an object with data for the search results
 */
export function useSearchResults() {
  return useSelector((reduxState) => reduxState.igdb?.results);
}

/**
 * Returns an object with data for the search results preview
 */
export function useSearchResultsPreview() {
  return useSelector((reduxState) => reduxState.igdb?.resultsPreview);
}
