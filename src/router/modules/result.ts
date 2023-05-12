import Error403 from 'pages/Result/403';
import Error404 from 'pages/Result/404';
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
        Component: Error403
      },
      {
        key: '/404',
        label: '404',
        Component: Error404,
        meta: {
          isFullPage: true,
        },
      },
    ],
  },
];

export default result;
