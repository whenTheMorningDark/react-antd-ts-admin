import React from 'react';
import './index.less';
import Toggle from './toogle';
import Setting from './setting';
import BreadCrumb from './breadCrumb';

const layoutsHeader = () => (
  <div className='layouts-header'>
    <div className='left-wrapper'>
      <Toggle />
      <BreadCrumb />
    </div>
    <Setting />
  </div>
);

export default layoutsHeader;
