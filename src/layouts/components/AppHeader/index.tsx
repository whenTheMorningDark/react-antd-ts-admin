import React, { memo } from 'react';
import { Layout, Space } from 'antd';
import { BarsOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { switchToggle } from 'modules/global/index';
import { setDialogShow } from 'modules/draw';
import AppBreadCrumb from '../AppBreadCrumb';

const { Header } = Layout;
const AppHeader = () => {
  const dispatch = useAppDispatch();
  const global = useAppSelector((state) => state.global);
  const handleClick = () => {
    dispatch(switchToggle(!global.isToggle));
  };
  const openDrawer = () => {
    dispatch(setDialogShow({
      open: true,
      width: 458,
      title: '页面设置',
      propsData: {
        id: 'qaq',
        type: 'themeSetting'
      }
    }));
  };

  return (
    <Header className='ka-header'>
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