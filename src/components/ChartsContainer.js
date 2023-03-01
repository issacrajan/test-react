import React, { useState } from 'react';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';
import BarChart from './BarChart';
import AreaChart from './AreaChart';

const ChartsContainer = () => {
  const { monthlyApplications } = useAppContext;
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChart data={monthlyApplications} />
      ) : (
        <AreaChart data={monthlyApplications} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
