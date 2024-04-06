import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signoutUser } from '../actions';

function NavBar(props) {
  const authenticated = useSelector((reduxState) => reduxState.auth.authenticated);

  // function that signs out the user
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(signoutUser(navigate));
  };

  return (
    <nav>
      <ul>
        {authenticated
          ? (<li onClick={signOut}>Sign Out</li>)
          : (
            <>
              <li><NavLink to="/signup">Sign Up</NavLink></li>
              <li><NavLink to="/signin">Log In</NavLink></li>
            </>
          )}

        <li><NavLink to="/">Games</NavLink></li>
        <li><NavLink to="/games/new">New Game</NavLink></li>
        <li><NavLink to="/games/:1">Game Test 1</NavLink></li>
        <li><NavLink to="/games/:2">Game Test 2</NavLink></li>

      </ul>
    </nav>
  );
}

export default NavBar;
