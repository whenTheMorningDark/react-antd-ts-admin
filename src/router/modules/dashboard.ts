import { lazy } from 'react';
// import { BorderOuterOutlined } from '@ant-design/icons';
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
        Component: lazy(() => import('pages/Dashboard/base'))
      },
      {
        key: '/workPlace',
        label: '工作台',
        meta: {},
        Component: lazy(() => import('pages/Dashboard/workPlace'))
      }
    ]
  },
];

export default dashboardRouter;
