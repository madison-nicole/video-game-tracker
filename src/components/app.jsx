import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from './nav-bar';
import Game from './game';
import Games from './games';
import NewGame from './new-game';
import RequireAuth from './require-auth';

export default function App(props) {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route element={<Games />} path="/" />
            <Route element={<RequireAuth> <NewGame /> </RequireAuth>} path="/games/new" />
            <Route element={<Game />} path="/games/:gameID" />
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
