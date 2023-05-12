import { lazy } from 'react';
// import { BorderOuterOutlined } from '@ant-design/icons';
import DashboardBoard from 'pages/Dashboard/base';
import WorkPlace from 'pages/Dashboard/workPlace';
import { IRouter } from '../index';

const dashboardRouter: IRouter[] = [
  {
    key: '/dashboard',
    label: '首页',
    icon: 'HomeOutlined',
    meta: {},
    children: [
      {
        key: '/base',
        label: '控制台',
        meta: {},
        Component: DashboardBoard
      },
      {
        key: '/workPlace',
        label: '工作台',
        meta: {},
        Component: WorkPlace
      }
    ]
  },
];

export default dashboardRouter;
