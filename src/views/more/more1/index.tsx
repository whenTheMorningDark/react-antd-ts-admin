import React from 'react';
import { Outlet } from 'react-router-dom';

function More1() {
  return (
    <div>
      <span>More啊实打实的撒1</span>
      <Outlet />
    </div>
  );
}
export default More1;
