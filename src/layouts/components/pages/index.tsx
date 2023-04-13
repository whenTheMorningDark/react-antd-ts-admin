import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useAppDispatch } from 'modules/store';
import { switchFullPage } from 'modules/global';

const { Content } = Layout;
interface PageProps {
  isFullPage?: boolean
}

const Page = (props: React.PropsWithChildren<PageProps>) => {
  const { isFullPage, children } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(switchFullPage(isFullPage));
  }, [isFullPage]);
  if (isFullPage) {
    return <>{children}</>;
  }
  return (
    <Content>
      {children}
    </Content>
  );
};
export default Page;