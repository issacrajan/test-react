import React from 'react';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>search</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            laborum ad cupiditate maiores impedit a accusantium voluptate
            ratione soluta explicabo vel quibusdam nulla alias quae, magnam,
            beatae itaque tempore? Quaerat?
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>

        <img src={main} alt='hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
