import React, { memo, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routers, { IRouter } from 'router';
import { resolve } from 'utils/path';
import { generateUid } from 'utils/uid';
import { Spin } from 'antd';
import Page from '../pages';

type TRenderRoutes = (routes: IRouter[], parentPath?: string, breadcrumbs?: string[]) => React.ReactNode[];
/**
 * 渲染应用路由
 * @param routes
 * @param parentPath
 * @param breadcrumb
 */

const renderRoutes: TRenderRoutes = (routes: IRouter[], parentPath = '') => {
  const result: React.ReactNode[] = [];

  function dfs(tRoutes: IRouter[], path: string) {

    for (let i = 0; i < tRoutes.length; i++) {
      const route = tRoutes[i];
      const { Component, children, redirect } = route;
      const currentPath = resolve(path, route.key);
      if (redirect) {
        result.push(
          <Route key={generateUid()} path={currentPath} element={<Navigate to={redirect} replace />} />
        );
      }
      if (Component) {
        result.push(
          <Route
            path={currentPath}
            key={generateUid()}
            element={
              <Page isFullPage={route.meta?.isFullPage}>
                <Component />
              </Page>
            }
          />
        );
      }
      if (children && children.length > 0) {
        dfs(children, currentPath);
      }
    }
  }

  dfs(routes, parentPath);
  return result;
};


const AppRouter = () => (
  <Suspense
    fallback={
      <div>
        <Spin />
      </div>
    }
  >
    <Routes>{renderRoutes(routers)}</Routes>
  </Suspense>
);
export default memo(AppRouter);