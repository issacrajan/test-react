import React, { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow, Alert, Logo } from '../components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  password: '',
  email: '',
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, showAlert, displayAlert, setupUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'login successful. forwarding..',
      });
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'user created. forwarding...',
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  }, [user, navigate]);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type='text'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          Submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
