import { lazy } from 'react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    key: '/result',
    label: '结果页',
    children: [
      {
        key: '/403',
        label: '403',
        children: [
          {
            key: '/40334',
            Component: lazy(() => import('pages/Result/403')),
            label: '40334',
          }
        ]
      },
      {
        key: '/404',
        label: '404',
        children: [
          {
            key: '/404232',
            Component: lazy(() => import('pages/Result/404')),
            label: '404232',
          }
        ]
      },
    ],
  },
];

export default result;
