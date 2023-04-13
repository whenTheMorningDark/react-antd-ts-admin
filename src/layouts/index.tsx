import React from 'react';
import './index.less';
import { selectGlobal } from 'modules/global';
import { useAppSelector } from 'modules/store';
import AppLayout from './components/AppLayout';

const Layouts = () => {
  const globalState = useAppSelector(selectGlobal);
  const AppContainer = globalState.isFullPage ? AppLayout.FullPageLayout : AppLayout.SideLayout;
  return (
    <div className='layouts-page'>
      <AppContainer />
    </div>
  );
};

export default React.memo(Layouts);