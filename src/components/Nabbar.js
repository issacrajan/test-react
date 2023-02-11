import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignRight, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';

const Nabbar = () => {
  const { user, toggleSidebar, logoutUser } = useAppContext();
  const [showLogout, setShowlogout] = useState(false);
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignRight />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowlogout(!showLogout)}
          >
            <FaUserCircle /> {user?.name} <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Nabbar;
