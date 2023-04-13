import { lazy } from 'react';

const result = [
  {
    path: '/login',
    meta: {
      title: '登录页',
      Icon: '',
    },
    children: [
      {
        path: 'index',
        Component: lazy(() => import('pages/Login')),
        isFullPage: true,
        meta: {
          title: '登录中心',
        },
      },
    ],
  },
];

export default result;
