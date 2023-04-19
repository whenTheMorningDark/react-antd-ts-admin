import React from 'react';
import './index.less';
import { selectGlobal } from 'modules/global';
import { useAppSelector } from 'modules/store';
import { Drawer } from 'antd';
import AppLayout from './components/AppLayout';

const Layouts = () => {
  const globalState = useAppSelector(selectGlobal);
  const drawState = useAppSelector((state) => state.draw);
  const AppContainer = globalState.isFullPage ? AppLayout.FullPageLayout : AppLayout.SideLayout;
  return (
    <div className='layouts-page'>
      <AppContainer />
      <Drawer
        title='Basic Drawer'
        placement='right'
        {...drawState.drawProps}
        onClose={drawState.drawProps.onClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default React.memo(Layouts);