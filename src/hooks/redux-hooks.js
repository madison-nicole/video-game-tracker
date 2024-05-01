import { useSelector } from 'react-redux';

// checking whether or not a user is signed in
export function useAuthenticated() {
  return useSelector((reduxState) => reduxState.auth.authenticated);
}

// fetch the top 100 rated games
export function useTopRated() {
  return useSelector((reduxState) => reduxState.igdb?.topRated);
}

// fetch data from selected game
export function useSelectedGame() {
  return useSelector((reduxState) => reduxState.igdb?.selectedGame);
}

// fetch the search results
export function useSearchResults() {
  return useSelector((reduxState) => reduxState.igdb?.results);
}

// fetch the search results preview
export function useSearchResultsPreview() {
  return useSelector((reduxState) => reduxState.igdb?.resultsPreview);
}
