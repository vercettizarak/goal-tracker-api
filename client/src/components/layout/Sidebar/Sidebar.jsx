import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <Link to='journal' className='btn btn-outline-primary w-75'>
        {' '}
        Journal
      </Link>
      <Link to='/week' className='btn btn-outline-primary w-75 my-3'>
        {' '}
        Weekly Review
      </Link>
      <Link to='/month' className='btn btn-outline-primary w-75 mb-3'>
        {' '}
        Monthly Review
      </Link>
      <Link to='/quarter' className='btn btn-outline-primary w-75 mb-3'>
        {' '}
        Quarterly Review
      </Link>
      <Link to='/year' className='btn btn-outline-primary w-75 mb-3'>
        {' '}
        Yearly Review
      </Link>
      <Link to='/profile' className='btn btn-outline-primary w-75 mb-3'>
        {' '}
        Profile
      </Link>
    </div>
  );
};

export default Sidebar;
