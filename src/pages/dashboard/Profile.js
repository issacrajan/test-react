import React, { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from './../../assets/wrappers/DashboardFormPage';
import { Alert, FormRow } from '../../components';

const Profile = () => {
  const { isLoading, showAlert, displayAlert, user, updateUserProfile } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUserProfile({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <FormRow
          type='text'
          name='name'
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <FormRow
          type='text'
          name='lastName'
          labelText='last name'
          value={lastName}
          handleChange={(e) => setLastName(e.target.value)}
        />
        <FormRow
          type='email'
          name='email'
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <FormRow
          type='text'
          name='location'
          value={location}
          handleChange={(e) => setLocation(e.target.value)}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'Please wait' : 'Save Changes'}
        </button>
      </form>
    </Wrapper>
  );
};

export default Profile;
