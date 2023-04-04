import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Layouts from '../layouts';
import { menus } from '../menus';
import { layoutRoutes } from './utils';

const layOutRoutes = layoutRoutes(menus);
const Router = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Navigate to='/dashboard' />,
    },
    {
      path: '',
      element: <Layouts />,
      children: layOutRoutes,
    },

  ]);

  return element;
};

export default Router;
