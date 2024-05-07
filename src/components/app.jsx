import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import NavBar from './nav-bar/nav-bar';
// import Game from './game';
import BrowseGames from './browse-games/browse-games';
import Games from './games';
import NewGame from './new-game';
import RequireAuth from './require-auth';
import Results from './search-results/results';
import AuthModal from './auth-modal/auth-modal';
import GameCard from './game/game-card';
import { fetchTopRatedGames } from '../actions';
import theme from '../theme/theme';
import { useUserInfo } from '../hooks/redux-hooks';
import UserProfile from './user-profile/user-profile';
import Settings from './user-profile/settings/settings';

export default function App(props) {
  // state
  const [accountStatus, setAccountStatus] = useState(true); // true if the user has an account

  // hooks
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure(); // auth modal
  const user = useUserInfo();

  // store user information
  const username = user?.username;

  // background processes
  // load top rated games
  useEffect(() => {
    dispatch(fetchTopRatedGames());
  }, [dispatch]);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <div>
          <NavBar accountStatus={accountStatus} setAccountStatus={setAccountStatus} username={username} onOpen={onOpen} />
          <AuthModal accountStatus={accountStatus} isOpen={isOpen} setAccountStatus={setAccountStatus} username={username} onClose={onClose} />
          <GameCard isOpenAuthModal={isOpen} openAuthModal={onOpen} />
          <Routes>
            <Route element={<Games />} path="/" />
            <Route element={<BrowseGames />} path="/browse" />
            <Route element={<RequireAuth> <NewGame /> </RequireAuth>} path="/games/new" />
            {/* <Route element={<Game />} path="/games/:gameID" /> */}
            <Route element={<Results />} path="/results" />
            <Route element={<UserProfile user={user} username={username} />} path="/:username" />
            <Route element={<RequireAuth> <Settings user={user} username={username} /> </RequireAuth>} path="/:username/settings" />
            <Route element={<FallBack />} path="*" />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

function FallBack(props) {
  return <div>URL Not Found</div>;
}
