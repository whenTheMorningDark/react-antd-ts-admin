import { lazy } from 'react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    key: '/dashboard',
    label: '首页',
    meta: {
    },
    Component: lazy(() => import('pages/Dashboard')),
  },
];

export default result;
