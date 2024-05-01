import { useSelector } from 'react-redux';

// checking whether or not a user is signed in
export function useAuthenticated() {
  return useSelector((reduxState) => reduxState.auth.authenticated);
}

// fetch the top 100 rated games
export function useTopRated() {
  return useSelector((reduxState) => reduxState.igdb?.topRated);
}

export function useSelectedGame() {
  return useSelector((reduxState) => reduxState.igdb?.selectedGame);
}
