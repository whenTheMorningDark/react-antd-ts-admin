import React, { memo, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import routers, { IRouter } from 'router';
import { resolve } from 'utils/path';
import { generateUid } from 'utils/uid';
import { Spin } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Da from 'pages/Dashboard/base';

import Page from '../pages';
import './index.less';

type TRenderRoutes = (routes: IRouter[], parentPath?: string, breadcrumbs?: string[]) => React.ReactNode[];

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
const AppRouter = () => {
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <div>
          <Spin />
        </div>
      }
    >
      <TransitionGroup style={{ height: 'calc(100% - 64px - 53px)' }}>
        <CSSTransition
          timeout={100}
          classNames='fade'
          key={location.pathname}
        >
          <Routes>{renderRoutes(routers)}</Routes>
        </CSSTransition>
      </TransitionGroup>
    </Suspense>
  );
};

export default memo(AppRouter);
