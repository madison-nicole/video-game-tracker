import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Games</NavLink></li>
        <li><NavLink to="/games/new">New Game</NavLink></li>
        <li><NavLink to="/games/:1">Game Test 1</NavLink></li>
        <li><NavLink to="/games/:2">Game Test 2</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
