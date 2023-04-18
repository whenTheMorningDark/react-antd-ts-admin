import React, { memo } from 'react';
import { Layout, Space } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import './index.less';

const { Header } = Layout;
const AppHeader = () => {
  console.log('AppHeader');
  return (
    <Header>
      <div className='header-left'>
        <BarsOutlined style={{ fontSize: '25px' }} />
      </div>
    </Header>
  );

};

export default memo(AppHeader);