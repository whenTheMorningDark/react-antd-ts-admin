import React from 'react';
import './index.less';
import { selectGlobal } from 'modules/global';
import { useAppSelector, useAppDispatch } from 'modules/store';
import { Drawer, Result } from 'antd';
import { setDialogShow } from 'modules/draw';
import WidthDetail from 'components/widthDetail';
import AppLayout from './components/AppLayout';


const Layouts = () => {
  const globalState = useAppSelector(selectGlobal);
  const drawState = useAppSelector((state) => state.draw);
  const AppContainer = globalState.isFullPage ? AppLayout.FullPageLayout : AppLayout.SideLayout;
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(setDialogShow({
      open: false
    }));
  };
  return (
    <div className='layouts-page'>
      <AppContainer />
      <Drawer
        title='Basic Drawer'
        placement='right'
        {...drawState}
        onClose={drawState.onClose ? drawState.onClose : onClose}
      >
        {
          drawState?.propsData?.type ? <WidthDetail {...drawState?.propsData} /> : <Result
            status='warning'
            title='There are some problems with your operation.'
          />
        }
      </Drawer>
    </div>
  );
};

export default React.memo(Layouts);