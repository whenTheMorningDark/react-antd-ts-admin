import React, { memo } from 'react';
import { Layout, Space } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import './index.less';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { switchToggle } from 'modules/global/index';

const { Header } = Layout;
const AppHeader = () => {
  console.log('AppHeader');
  const dispatch = useAppDispatch();
  const global = useAppSelector((state) => state.global);
  const handleClick = () => {
    console.log('ww');
    dispatch(switchToggle(!global.isToggle));
  };
  return (
    <Header>
      <div className='header-left'>
        <BarsOutlined style={{ fontSize: '22px' }} onClick={handleClick} />
      </div>
    </Header>
  );

};

export default memo(AppHeader);