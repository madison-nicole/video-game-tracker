import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signoutUser } from '../actions';

function NavBar({ onOpen }) {
  const authenticated = useSelector((reduxState) => reduxState.auth.authenticated);

  // function that signs out the user
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(signoutUser(navigate));
  };

  return (
    <nav className="home-nav-bar">
      <ul>
        {authenticated
          ? (<li className="auth-links" onClick={signOut}>Sign Out</li>)
          : (
            <>
              <li className="auth-links" onClick={onOpen}>Sign Up</li>
              <li className="auth-links" onClick={onOpen}>Log In</li>
            </>
          )}

        <li><NavLink to="/">Games</NavLink></li>
        <li><NavLink to="/games/new">New Game</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
