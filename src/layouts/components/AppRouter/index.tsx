import React, { memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routers, { IRouter } from 'router';
import { resolve } from 'utils/path';
import Page from '../pages';

type TRenderRoutes = (routes: IRouter[], parentPath?: string, breadcrumbs?: string[]) => React.ReactNode[];
/**
 * 渲染应用路由
 * @param routes
 * @param parentPath
 * @param breadcrumb
 */
const renderRoutes: TRenderRoutes = (routes, parentPath = '') =>
  routes.map((route, index: number) => {
    const { Component, children, redirect } = route;
    const currentPath = resolve(parentPath, route.key);
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
            <Page isFullPage={route.meta?.isFullPage}>
              <Component />
            </Page>
          }
        />
      );
    }
    // 无路由菜单
    return children ? renderRoutes(children, currentPath) : null;
  });

const AppRouter = () => {
  console.log('AppRouter');
  return (
    <Routes>{renderRoutes(routers)}</Routes>
  );
};
export default memo(AppRouter);