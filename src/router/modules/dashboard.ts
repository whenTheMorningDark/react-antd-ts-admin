import { lazy } from 'react';
// import { BorderOuterOutlined } from '@ant-design/icons';
// import { HomeOutlined, ReconciliationOutlined, CodepenOutlined } from '@ant-design/icons';
import { IRouter } from '../index';

const dashboardRouter: IRouter[] = [
  {
    key: '/dashboard',
    label: '首页',
    icon: 'HomeOutlined',
    meta: {},
    Component: lazy(() => import('pages/Dashboard')),
  },
];

export default dashboardRouter;
