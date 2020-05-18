import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';

const Navbar = () => {
  //init context and extract function
  const authContext = useContext(AuthContext);
  const { logOut, isAuthenticated, user } = authContext;

  if (isAuthenticated) {
    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-dark text-white mb-3'>
        <div className='container-md d-flex justify-content-between'>
          <Link to='/' className='navbar-brand '>
            Goals Tracker - Track your Goals
          </Link>
          <button
            className='navbar-toggler'
            data-toggle='collapse'
            data-target='#navbarNav'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse ' id='navbarNav'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='#!'>
                  {console.log(user)}
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/profile'>
                  <i className='fas fa-cog'></i>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  to='/login'
                  onClick={() => {
                    logOut();
                  }}>
                  Log out
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/about'>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark text-white mb-3'>
      <div className='container-md d-flex justify-content-between'>
        <Link to='/' className='navbar-brand '>
          Goals Tracker - Track your Goals
        </Link>
        <button
          className='navbar-toggler'
          data-toggle='collapse'
          data-target='#navbarNav'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse ' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/about'>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
