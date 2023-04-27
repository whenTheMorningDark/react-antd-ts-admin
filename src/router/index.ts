import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import type { SubMenuType } from 'antd/lib/menu/hooks/useItems';
import dashboardRouter from './modules/dashboard';
import resultRouter from './modules/result';
import otherRoutes from './modules/others';

export interface IRouter extends Omit<SubMenuType, 'children' | 'label' | 'icon'> {
  key: string;
  redirect?: string;
  Component?: React.FC<BrowserRouterProps> | (() => any);
  /**
   * 当前路由是否全屏显示
   */
  label?: string;
  icon?: React.ReactNode | string;
  /**
   * meta未赋值 路由不显示到菜单中
   */
  meta?: {
    isFullPage?: boolean;

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
    meta: {
      isFullPage: true,
      hidden: true,
    },
  },
  {
    key: '/',
    redirect: '/dashboard',
    meta: {
      hidden: true,
    },
  },
];

const allRoutes = [...routes, ...dashboardRouter, ...resultRouter,...otherRoutes];


export default allRoutes;