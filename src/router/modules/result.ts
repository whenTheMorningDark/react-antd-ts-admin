import { lazy } from 'react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    key: '/result',
    label: '结果页',
    icon: 'SecurityScanOutlined',
    children: [
      {
        key: '/403',
        label: '403',
        Component: lazy(() => import('pages/Result/403'))
      },
      {
        key: '/404',
        label: '404',
        Component: lazy(() => import('pages/Result/404'))
      },
    ],
  },
];

export default result;
