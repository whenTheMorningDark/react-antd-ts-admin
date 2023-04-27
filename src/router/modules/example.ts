import { lazy } from 'react';
import { IRouter } from '../index';

const exampleRouter: IRouter[] = [
  {
    key: '/example',
    label: '全屏例子',
    icon: 'HomeOutlined',
    Component: lazy(() => import('pages/example')),
    meta: {
      isFullPage: true,
    },
  },
];

export default exampleRouter;
