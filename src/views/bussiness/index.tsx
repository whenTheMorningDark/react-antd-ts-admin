import React from 'react';
import { Outlet } from 'react-router-dom';

function Bussiness() {
  return (
    <div className='bussiness' style={{ width: '100%', height: '500px' }}>
      <Outlet />
    </div>
  );
}
export default Bussiness;
