import React from 'react';
import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import { useEffect } from 'react';

const JobContainer = () => {
  const { isLoading, showAlert, getJobs, jobs, totalJobs, numOfPages } =
    useAppContext();

  useEffect(() => {
    console.log('fetching jobs');
    getJobs();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>total jobs: {totalJobs} </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job.id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobContainer;
