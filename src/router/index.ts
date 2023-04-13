import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import dashboardRouter from './modules/dashboard';
import resultRouter from './modules/result';

export interface IRouter {
  key: string;
  redirect?: string;
  Component?: React.FC<BrowserRouterProps> | (() => any);
  /**
   * 当前路由是否全屏显示
   */
  isFullPage?: boolean;
  label?: string;
  Icon?: React.FC;
  /**
   * meta未赋值 路由不显示到菜单中
   */
  meta?: {
    /**
     * 侧边栏隐藏该路由
     */
    hidden?: boolean;
    /**
     * 单层路由
     */
    single?: boolean;
  };
  children?: IRouter[];
}
const routes: IRouter[] = [
  {
    key: '/login',
    Component: lazy(() => import('pages/Login')),
    isFullPage: true,
    meta: {
      hidden: true,
    },
  },
];

const allRoutes = [...routes, ...dashboardRouter, ...resultRouter];


export default allRoutes;