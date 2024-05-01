import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import NavBar from './nav-bar';
import Game from './game';
import BrowseGames from './browse-games';
import Games from './games';
import NewGame from './new-game';
import RequireAuth from './require-auth';
import Results from './results';
import AuthModal from './auth-modal';
import GameCard from './game-card';
import { fetchTopRatedGames, selectGame } from '../actions';

export default function App(props) {
  // state
  const [accountStatus, setAccountStatus] = useState(true); // true if the user has an account

  // hooks
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure(); // auth modal

  // background processes
  // load top rated games
  useEffect(() => {
    dispatch(fetchTopRatedGames());
  }, [dispatch]);

  // select game and fetch data
  const onSelectGame = useCallback((game, coverUrl, year) => {
    dispatch(selectGame(game, coverUrl, year));
  }, [dispatch]);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div>
          <NavBar accountStatus={accountStatus} setAccountStatus={setAccountStatus} onOpen={onOpen} />
          <AuthModal accountStatus={accountStatus} isOpen={isOpen} setAccountStatus={setAccountStatus} onClose={onClose} />
          <GameCard isOpenAuthModal={isOpen} openAuthModal={onOpen} />
          <Routes>
            <Route element={<Games />} path="/" />
            <Route element={<BrowseGames onSelectGame={onSelectGame} />} path="/browse" />
            <Route element={<RequireAuth> <NewGame /> </RequireAuth>} path="/games/new" />
            <Route element={<Game />} path="/games/:gameID" />
            <Route element={<Results />} path="/results" />
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
