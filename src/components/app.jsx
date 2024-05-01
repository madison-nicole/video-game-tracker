import React, { useState, useEffect } from 'react';
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
import { fetchTopRatedGames } from '../actions';

export default function App(props) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // auth modal
  const [accountStatus, setAccountStatus] = useState(true); // true if the user has an account

  const dispatch = useDispatch();

  // load top rated games in background
  useEffect(() => {
    dispatch(fetchTopRatedGames());
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
            <Route element={<BrowseGames />} path="/browse" />
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
