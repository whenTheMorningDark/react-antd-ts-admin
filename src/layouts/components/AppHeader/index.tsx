import React, { memo } from 'react';
import { Layout, Space } from 'antd';
import { BarsOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { switchToggle } from 'modules/global/index';
import { setDrawProps } from 'modules/draw';
import AppBreadCrumb from '../AppBreadCrumb';

const { Header } = Layout;
const AppHeader = () => {
  const dispatch = useAppDispatch();
  const global = useAppSelector((state) => state.global);
  const handleClick = () => {
    dispatch(switchToggle(!global.isToggle));
  };
  const onClose = () => {
    console.log('onCloseaaaa');
  };
  const openDrawer = () => {
    dispatch(setDrawProps({
      width: 458,
      open: true,
      title: 'wdwdw',
      // onClose
    }));
  };

  return (
    <Header>
      <div className='header-left'>
        <BarsOutlined style={{ fontSize: '22px' }} onClick={handleClick} />
        <AppBreadCrumb />
      </div>
      <div className='header-right'>
        <Space>
          <SettingOutlined
            className='header-right-icon'
            style={{ fontSize: '16px' }}
            onClick={openDrawer}
          >

          </SettingOutlined>
        </Space>
      </div>
    </Header >
  );

};

export default memo(AppHeader);