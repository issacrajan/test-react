import React, { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { Loading, StatsContainer, ChartsContainer } from '../../components';

const Stats = () => {
  const { isLoading, showStats, monthlyApplications } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications?.length && <ChartsContainer />}
    </>
  );
};

export default Stats;
