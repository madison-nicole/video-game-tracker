import React from 'react';
import {
  BrowserRouter, Routes, Route, NavLink, useParams,
} from 'react-router-dom';

export default function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<BrowseGames />} path="/browse-games" />
          <Route element={<Test />} path="/test/:id" />
          <Route element={<FallBack />} path="*" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function FallBack(props) {
  return <div>URL Not Found</div>;
}

function Test(props) {
  const { id } = useParams();
  return <div> ID: {id} </div>;
}

function About(props) {
  return <div> All there is to know about me </div>;
}
function Welcome(props) {
  return <div>Welcome</div>;
}
