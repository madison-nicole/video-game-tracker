import React from 'react';
import {
  BrowserRouter, Routes, Route, useParams,
} from 'react-router-dom';
import NavBar from './nav-bar';

export default function App(props) {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<BrowseGames />} path="/browse" />
          <Route element={<Game />} path="/game/:id" />
          <Route element={<FallBack />} path="*" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function FallBack(props) {
  return <div>URL Not Found</div>;
}

function Game(props) {
  const { id } = useParams();
  return <div> ID: {id} </div>;
}

function Home(props) {
  return <div> Home Page </div>;
}

function Profile(props) {
  return <div>My Profile</div>;
}

function BrowseGames(props) {
  return <div> All Games </div>;
}
