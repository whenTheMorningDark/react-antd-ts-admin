import { lazy } from 'react';

const result = [
  {
    path: '/dashboard',
    meta: {
      title: '首页',
    },
    Component: lazy(() => import('pages/Dashboard')),
  },
];

export default result;
