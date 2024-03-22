import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from './nav-bar';
import Game from './game';
import Games from './games';
import NewGame from './new-game';

export default function App(props) {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route element={<Games />} path="/" />
            <Route element={<NewGame />} path="/games/new" />
            <Route element={<Game />} path="/games/:gameID" />
            <Route element={<FallBack />} path="*" />
          </Routes>

          {/* <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<BrowseGames />} path="/browse" />
            <Route element={<Game />} path="/game/:id" />
            <Route element={<FallBack />} path="*" />
          </Routes> */}
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

function FallBack(props) {
  return <div>URL Not Found</div>;
}
