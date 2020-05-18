import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';
import { Link } from 'react-router-dom';

const Mission = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;
  useEffect(
    () => {
      loadUser();
    },
    // eslint-disable-next-line
    [],
    // eslint-disable-next-line
    user
  );
  if (!user) {
    return (
      <div className='border rounded border-secondary w-50 mx-auto bg-light row px-3 py-2 mb-3'>
        <h4 className='mx-auto text-light'>
          <span className='font-italic text-muted d-block-sm '>Loading...</span>
        </h4>
      </div>
    );
  }

  return (
    <div className='border rounded border-secondary w-50 mx-auto bg-light row px-3 py-2 mb-3'>
      {user.mission !== undefined ? (
        <h4 className='mx-auto text-light'>
          <span className='font-italic text-muted d-block-sm '>Mission:</span>
          <span className='text-info'> {user.mission} </span>
        </h4>
      ) : (
        <h4 className='mx-auto text-light'>
          <span className='font-italic text-muted d-block-sm '>
            Please add a Mission to your profile <Link to='/profile'>here</Link>
          </span>
        </h4>
      )}
    </div>
  );
};

export default Mission;
