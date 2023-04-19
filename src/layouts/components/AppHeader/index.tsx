import React, { memo } from 'react';
import { Layout } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import './index.less';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { switchToggle } from 'modules/global/index';
import AppBreadCrumb from '../AppBreadCrumb';

const { Header } = Layout;
const AppHeader = () => {
  const dispatch = useAppDispatch();
  const global = useAppSelector((state) => state.global);
  const handleClick = () => {
    dispatch(switchToggle(!global.isToggle));
  };
  return (
    <Header>
      <div className='header-left'>
        <BarsOutlined style={{ fontSize: '22px' }} onClick={handleClick} />
        <AppBreadCrumb />
      </div>
    </Header>
  );

};

export default memo(AppHeader);