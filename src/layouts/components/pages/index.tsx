import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useAppDispatch } from 'modules/store';
import { switchFullPage } from 'modules/global';
import { Navigate, useLocation } from 'react-router-dom';

const { Content } = Layout;
interface PageProps {
  isFullPage?: boolean
}

const whiteRouter = ['/login'];

const Page = (props: React.PropsWithChildren<PageProps>) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  console.log(location, 'w', location.search.indexOf('token'));
  const { isFullPage, children } = props;
  const token = location.search.indexOf('token');
  useEffect(() => {
    dispatch(switchFullPage(isFullPage));
  }, [isFullPage]);
  if (whiteRouter.includes(location.pathname)) {
    if (token) {
      return <Navigate to={'/dashboard?token=7777'} replace />;
    }
    if (isFullPage) {
      return <>{children}</>;
    }
    return (
      <Content>
        {children}
      </Content>
    );
  }

  if (token) {
    if (isFullPage) {
      return <>{children}</>;
    }
    return (
      <Content>
        {children}
      </Content>
    );
  }


  return <Navigate to={'/login'} replace />;

};
export default React.memo(Page);