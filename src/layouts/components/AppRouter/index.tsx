import React from 'react';
import { Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import routers, { IRouter } from 'router';

export const resolve = (path1 = '', path2 = '') => {
  let separator = '/';
  if (path1.endsWith('/') || path2.startsWith('/')) {
    separator = '';
  }
  return `${path1}${separator}${path2}`;
};
const { Content } = Layout;
type TRenderRoutes = (routes: IRouter[], parentPath?: string, breadcrumbs?: string[]) => React.ReactNode[];
/**
 * 渲染应用路由
 * @param routes
 * @param parentPath
 * @param breadcrumb
 */
const renderRoutes: TRenderRoutes = (routes, parentPath = '', breadcrumb = []) =>
  routes.map((route, index: number) => {
    const { Component, children, redirect, meta } = route;
    const currentPath = resolve(parentPath, route.path);
    let currentBreadcrumb = breadcrumb;

    if (meta?.title) {
      currentBreadcrumb = currentBreadcrumb.concat([meta?.title]);
    }

    if (redirect) {
      // 重定向
      return <Route key={index} path={currentPath} element={<Navigate to={redirect} replace />} />;
    }

    if (Component) {
      // 有路由菜单
      return (
        <Route
          key={index}
          path={currentPath}
          element={
            <Component />
          }
        />
      );
    }
    // 无路由菜单
    return children ? renderRoutes(children, currentPath, currentBreadcrumb) : null;
  });

const AppRouter = () => {
  console.log('AppRouter');
  return (
    <Content>
      <Routes>{renderRoutes(routers)}</Routes>
    </Content>
  );
};
export default AppRouter;