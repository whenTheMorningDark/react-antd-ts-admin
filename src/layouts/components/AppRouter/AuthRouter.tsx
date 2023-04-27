import React from 'react';
import { Route, useLocation, Navigate } from 'react-router-dom';

type AuthRouterProps = {
  component: React.ElementType;
  [key: string]: any;
};

const AuthRouter = ({ component: Component, ...rest }: AuthRouterProps) => {
  const location = useLocation();
  return (
    <Route
      {...rest}
      element={location.search.indexOf('token') > -1 ? <Component {...rest} /> : <Navigate to={'/login'} />}
    />
  );
};

export default AuthRouter;
