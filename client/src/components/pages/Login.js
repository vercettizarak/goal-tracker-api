import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  //Init context and extract data and actions
  const authContext = useContext(AuthContext);
  const { loginUser, isAuthenticated, loadUser } = authContext;

  useEffect(
    () => {
      loadUser();
    },
    // eslint-disable-next-line
    []
  );
  if (isAuthenticated) {
    props.history.push('/');
  }
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email.length > 0 && password.length > 5) {
      loginUser(user);
      setUser({ email: '', password: '' });
    } else {
      alert('Please add your Email and your password');
    }
  };

  return (
    <div className='row'>
      <div className='col-md-6 mx-auto my-4'>
        <div className='card'>
          <div className='card-header'>
            <h4 className='text-center'>Account Login</h4>
          </div>
          <div className='card-body'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <input
                type='submit'
                value='Login'
                className='btn btn-primary btn-block'
              />
            </form>
            <Link to='/register' className='btn btn-secondary btn-block my-3'>
              {' '}
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
