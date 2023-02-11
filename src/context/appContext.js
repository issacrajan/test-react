import React, { useContext, useReducer } from 'react';
import axios from 'axios';

import reducer from './reducer';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_PROFILE_BEGIN,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR,
  HANDLE_CHANGE,
  CLEAR_JOB_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const location = localStorage.getItem('location');

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location || '',

  showSidebar: false,
  isEditing: false,
  editJobId: '',
  jobCompany: '',
  jobPosition: '',
  jobLocation: location || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  jobStatusOptions: ['interview', 'declined', 'pending'],
  jobStatus: 'pending',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //START: axios setup----------------------------------------
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  //request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        console.log('AUTH ERROR.....');
      }
      return Promise.reject(error);
    }
  );
  //END: axios setup----------------------------------------

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 7000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const resp = await axios.post(`/auth/${endPoint}`, currentUser);
      console.log(resp);
      const { user, token, location } = resp.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });

      //add to local storage
      addUserToLocalStorage({ user, token, location });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: err.response.data,
      });
    }

    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });

    removeUserFromLocalStorage();
  };

  const updateUserProfile = async (currentUser) => {
    dispatch({ type: UPDATE_USER_PROFILE_BEGIN });

    try {
      const resp = await authFetch.patch('/user/updateprofile', currentUser);
      console.log(resp);
      const { user, token, location } = resp.data;
      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: { user, token, location },
      });

      //add to local storage
      addUserToLocalStorage({ user, token, location });
    } catch (err) {
      console.log(err);
      dispatch({
        type: UPDATE_USER_PROFILE_ERROR,
        payload: err?.response?.data | 'something went wrong',
      });
    }

    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearJobValues = () => {
    dispatch({ type: CLEAR_JOB_VALUES });
  };

  const creaeJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { jobCompany, jobPosition, jobLocation, jobType, jobStatus } =
        state;
      const resp = await authFetch.post('/job/createjob', {
        jobCompany,
        jobPosition,
        jobLocation,
        jobType,
        jobStatus,
      });
      console.log(resp);
      // const { user, token, location } = resp.data;
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_JOB_VALUES });
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: err?.response?.data.message | 'something went wrong',
      });
    }

    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUserProfile,
        handleChange,
        clearJobValues,
        creaeJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
