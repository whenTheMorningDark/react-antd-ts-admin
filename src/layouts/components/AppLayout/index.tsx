
import React from 'react';
import AppRouter from '../AppRouter';
import Menu from '../Menu';

const SideLayout = React.memo(() => (
  <div className='layout-sidebar'>
    <Menu />
    <AppRouter />
  </div>


));

const FullPageLayout = React.memo(() => (
  <React.Fragment>
    <AppRouter />
  </React.Fragment>
));

export default {
  SideLayout,
  FullPageLayout
};