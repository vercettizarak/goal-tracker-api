import React, { useState } from 'react';

const ProfileEditor = ({ user, changeRoute, updateUser }) => {
  if (user) console.log(user);

  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    mission: user.mission,
  });

  const { name, email, mission } = profile;

  const onChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    console.log(profile);
  };

  const onSubmit = e => {
    if (name.length > 0 && email.length && mission.length > 0) {
      updateUser(profile);
      changeRoute('show');
    } else {
      alert('Please fill all the fields');
    }
  };

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
          onChange={onChange}
          name='name'
          defaultValue={name}
        />
      </div>
      <div className='form-group'></div>
      <div className='form-group'>
        <label htmlFor='name'>Email</label>
        <input
          type='email'
          id='email'
          className='form-control w-50'
          onChange={onChange}
          name='email'
          defaultValue={email}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='name'>Mission</label>
        <input
          type='text'
          id='mission'
          className='form-control w-50'
          onChange={onChange}
          name='mission'
          defaultValue={mission}
        />
      </div>
      <button className='btn btn-primary w-25' onClick={onSubmit}>
        Save{' '}
      </button>
    </div>
  );
};

export default ProfileEditor;
