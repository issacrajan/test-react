import React from 'react';
import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

const Job = ({
  id,
  jobCompany,
  jobPosition,
  jobLocation,
  jobType,
  jobStatus,
  createdTs,
}) => {
  let date = moment(createdTs);
  date = date.format('MMM Do, YYYY');
  const { readJobRecord, deleteJob } = useAppContext();

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{jobCompany.charAt(0)}</div>
        <div className='info'>
          <h5>{jobPosition}</h5>
          <p>{jobCompany}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/dashboard/add-job'
              className='btn edit-btn'
              onClick={() => readJobRecord(id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteJob(id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
