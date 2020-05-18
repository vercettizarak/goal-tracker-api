import React from 'react';

const ProfileEditor = ({ changeRoute, user }) => {
  const { email, name, mission } = user;
  if (user) console.log(user);

  return (
    <div>
      <h4 className='text-primary text-center'>Profile</h4>
      <hr />
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          className='form-control w-50'
          name='name'
          value={name}
          readOnly
        />
      </div>
      <div className='form-group'></div>
      <div className='form-group'>
        <label htmlFor='name'>Email</label>
        <input
          type='email'
          id='email'
          className='form-control w-50'
          name='email'
          value={email}
          readOnly
        />
      </div>
      <div className='form-group'>
        <label htmlFor='name'>Mission</label>
        <input
          type='text'
          id='mission'
          className='form-control w-50'
          name='mission'
          value={mission}
          readOnly
        />
      </div>
      <button
        className='btn btn-outline-primary w-25'
        onClick={() => changeRoute('edit')}>
        Edit{' '}
      </button>
    </div>
  );
};

export default ProfileEditor;
