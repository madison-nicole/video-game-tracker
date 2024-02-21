import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/game/id1">game test id1</NavLink></li>
        <li><NavLink to="/game/id2">game test id2</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
