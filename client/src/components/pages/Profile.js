import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../layout/Sidebar/Sidebar';
import ProfileEditor from '../layout/Editor/ProfileEditor';
import ShowProfile from '../layout/Editor/ShowProfile';
import AuthContext from '../../context/auth/authContext';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser, updateUser } = authContext;

  const [route, setRoute] = useState('show');

  const changeRoute = text => {
    setRoute(text);
  };
  useEffect(
    () => {
      loadUser();
    },
    // eslint-disable-next-line
    [],
    user
  );

  if (!user) {
    return (
      <div>
        <div className='container '>
          <div className='row'>
            <div className='col-md-3 text-center mt-5 mb-4'>
              {' '}
              <Sidebar />
            </div>
            <div className='col-md-9'>
              <h3 className='m-5'>Loading...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='container '>
        <div className='row'>
          <div className='col-md-3 text-center mt-5 mb-4'>
            {' '}
            <Sidebar />
          </div>
          <div className='col-md-9'>
            {route === 'show' ? (
              <ShowProfile user={user} changeRoute={changeRoute} />
            ) : (
              <ProfileEditor
                user={user}
                changeRoute={changeRoute}
                updateUser={updateUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
