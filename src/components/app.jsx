import React from 'react';
import {
  BrowserRouter, Routes, Route, NavLink, useParams,
} from 'react-router-dom';
import Counter from './counter';
import Controls from './controls';

export default function App(props) {
  return (
    <BrowserRouter>
      <div>
        <div><p>Hello</p></div>
        <Nav />
        <Routes>
          <Route element={<Welcome />} path="/" />
          <Route element={<Counter />} path="/counter" />
          <Route element={<Controls />} path="/controls" />
          <Route element={<About />} path="/about" />
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

function Nav(props) {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
        <li><NavLink to="/test/id2">test id2</NavLink></li>

      </ul>
    </nav>
  );
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
