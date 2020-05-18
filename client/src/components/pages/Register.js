import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  //Init context and extract the function
  const authContext = useContext(AuthContext);
  const { registerUser, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  });
  const iniUser = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  const [user, setUser] = useState(iniUser);
  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 5 &&
      password2.length > 5 &&
      password === password2
    ) {
      registerUser(user);
      setUser(iniUser);
    } else {
      console.log('erro grave');
    }
  };
  return (
    <div className='row'>
      <div className='col-md-6 mx-auto my-4'>
        <div className='card'>
          <div className='card-header'>
            <h4 className='text-center'>Account Register</h4>
          </div>
          <div className='card-body'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  id='name'
                  onChange={onChange}
                  value={name}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  id='email'
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  id='password'
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password2'>Confirm Password</label>
                <input
                  type='password'
                  className='form-control'
                  name='password2'
                  id='password2'
                  value={password2}
                  onChange={onChange}
                  required
                />
              </div>
              <input
                type='submit'
                value='Register'
                className='btn btn-primary btn-block'
              />
            </form>
            <Link to='/login' className='btn btn-secondary btn-block my-3'>
              {' '}
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
