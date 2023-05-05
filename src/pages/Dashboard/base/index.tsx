import React from 'react';
import { useTimer } from 'hooks/useTimer';
import TopPanel from './components/topPanel';

const DashboardBase = () => {
  console.log('wwww');
  const [value] = useTimer(0);
  return (
    <div className='z-h-100'>
      <TopPanel></TopPanel>
      {value}
    </div>
  );
};

export default DashboardBase;