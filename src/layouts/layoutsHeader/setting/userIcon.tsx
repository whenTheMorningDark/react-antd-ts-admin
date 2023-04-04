import React from 'react';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Avatar } from 'antd';
import './userIcon.less';

const items: MenuProps['items'] = [
  {
    label: <div className='layout-header-item'><LogoutOutlined /><span className='text'>退出</span></div>,
    key: '0',
  },
];
function UserIcon() {
  return (
    <div className='userIcon'>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        overlayClassName='icon-drop'
      >
        <Space>
          <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size='default' gap={4}>
            张
          </Avatar>
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
}

export default UserIcon;
