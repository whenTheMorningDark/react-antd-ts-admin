import React from 'react';
import './index.less';
import Toggle from './toogle';
import Setting from './setting';

const layoutsHeader = () => (
  <div className='layouts-header'>
    <div className='left-wrapper'>
      <Toggle />
      <div>123</div>
    </div>
    <Setting />
  </div>
);

export default layoutsHeader;
