import { lazy } from 'react';
import { IRouter } from '../index';

const otherRoutes: IRouter[] = [
  {
    key: '*',
    Component: lazy(() => import('pages/Result/404')),
    meta: {
      hidden: true,
    },
  },
];

export default otherRoutes;
