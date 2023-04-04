import React from 'react';
import type { SubMenuType } from 'antd/lib/menu/hooks/useItems';
import { HomeOutlined, ReconciliationOutlined, CodepenOutlined } from '@ant-design/icons';
import More from 'src/views/more';
import More1 from 'src/views/more/more1';
import More2 from 'src/views/more/more2';
import Dashboard from '../views/dashboard';
import Flow from '../views/bussiness/flow';
import Form from '../views/bussiness/form';
import Bussiness from '../views/bussiness';
import GameList from '../views/gameList';
import MusicList from '../views/musicList';

export interface ISideMenu extends Omit<SubMenuType, 'children' | 'label' | 'icon'> {
  label: string;
  key: string;
  name: string;
  icon?: React.ReactNode | string;
  rule?: string; // 路由权限
  nav?: string[]; // 面包屑路径
  element?: React.ReactNode;
  children?: ISideMenu[];
  parentkey?: string[];
}

const menus: ISideMenu[] = [
  {
    key: '/dashboard',
    label: '首页',
    name: 'dashboard',
    icon: <HomeOutlined />,
    element: <Dashboard />,
  },
  {
    key: 'bussiness',
    label: '办公专用',
    name: 'bussiness',
    element: <Bussiness />,
    icon: <ReconciliationOutlined />,
    children: [
      {
        label: '流程',
        key: '/bussiness/flow',
        name: 'flow',
        element: <Flow />,
        parentkey: ['bussiness'],
      },
      {
        label: '表单',
        key: '/bussiness/form',
        name: 'form',
        element: <Form />,
        parentkey: ['bussiness'],
      },
    ],
  },
  {
    key: 'more',
    label: '跟多',
    name: 'more',
    element: <More />,
    icon: <ReconciliationOutlined />,
    children: [
      {
        label: '跟多1',
        key: 'more1',
        name: 'more1',
        element: <More1 />,
        parentkey: ['more'],
        children: [
          {
            label: '跟多2',
            key: '/more/more1/more2',
            name: 'more2',
            element: <More2 />,
            parentkey: ['more', 'more1'],
          },
        ],
      },
    ],
  },

  {
    key: '/gameList',
    label: '游戏专区',
    name: 'gameList',
    icon: <CodepenOutlined />,
    element: <GameList />,
  },
  {
    key: '/musicList',
    label: '音乐专区',
    name: 'musicList',
    icon: <CodepenOutlined />,
    element: <MusicList />,
  },
];

export { menus };
