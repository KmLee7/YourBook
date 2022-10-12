import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { logout } from '../../store/session';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  let sessionLinks;
  if (!sessionUser) {
    return (
      sessionLinks = (
      
        <div className='home-page'>
          <div className='left-container'>
              <div id='facebook-logo'>facebook</div>
            <h2 id='home-page-info'>Connect with friends and the world around you on Facebook</h2>
          </div>
          <div className='right-container'>
            <input
            id='login-email'
            placeholder='Email or phone number' 
            type='email'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
            <br />
            <input
            id='login-password'
            placeholder='Password' 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <br />
          <button className='loginButton'>Log In</button>
          <hr className='borderline'></hr>
          <div style={{textAlign: 'center'}}>
            <SignupFormModal />
          </div>
          </div>
        </div>
      
      )
    );
    // sessionLinks = (
    //   <ProfileButton user={sessionUser} />
    // );
  } else {
    return (
      sessionLinks = ( 
        <button onClick={() => {dispatch(logout())}}>Logout</button>
      )
    )
    
  }
}

export default Navigation;