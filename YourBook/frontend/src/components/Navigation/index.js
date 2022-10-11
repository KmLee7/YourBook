import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { logout } from '../../store/session';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let sessionLinks;
  if (sessionUser) {
    // sessionLinks = (
    //   // <ProfileButton user={sessionUser} />
    // );
    sessionLinks = ( 
    <button onClick={() => {dispatch(logout())}}>Logout</button>
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
        <NavLink to="/signup">Sign Up</NavLink>
        <br></br>
        <NavLink to="/login">Login</NavLink>
      </>
    );
  }

  return (
    <ul>
        <NavLink exact to="/">Home</NavLink>
        <br></br>
        {sessionLinks}
    </ul>
  );
}

export default Navigation;