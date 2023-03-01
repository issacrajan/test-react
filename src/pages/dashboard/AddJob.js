import React from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from './../../assets/wrappers/DashboardFormPage';
import { Alert, FormRow, FormRowSelect } from '../../components';

const AddJob = () => {
  const {
    showAlert,
    displayAlert,
    isEditing,
    jobCompany,
    jobPosition,
    jobLocation,
    jobTypeOptions,
    jobType,
    jobStatusOptions,
    jobStatus,
    handleChange,
    creaeJob,
    updateJobRecord,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobCompany || !jobPosition || !jobLocation || !jobType || !jobStatus) {
      displayAlert();
      return;
    }
    if (isEditing) {
      //update job
      updateJobRecord();
    } else {
      creaeJob();
    }
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRow
            type='text'
            name='jobPosition'
            value={jobPosition}
            handleChange={handleJobInput}
          />
          <FormRow
            type='text'
            name='jobCompany'
            value={jobCompany}
            handleChange={handleJobInput}
          />
          <FormRow
            type='text'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            name='jobStatus'
            value={jobStatus}
            handleChange={handleJobInput}
            optionList={jobStatusOptions}
            labelText='Job Status'
          />
          <FormRowSelect
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            optionList={jobTypeOptions}
            labelText='Job Types'
          />
          <div className='button-container'>
            <button type='submit' className='btn  submit-btn'>
              save
            </button>
            <button
              type='button'
              className='btn clear-btn'
              onClick={(e) => console.log('hello')}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
