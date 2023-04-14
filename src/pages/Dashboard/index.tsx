import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  console.log('Dashboard');
  const navigate = useNavigate();
  const jump = () => {
    navigate('/result/403/40334');
  };
  return (
    <div>
      <button type='button' onClick={jump}>s</button>

    </div>
  );
};

export default memo(Dashboard);