import React, { memo } from 'react';
import { Breadcrumb } from 'antd';
import { useBreadCrumb } from 'hooks/useBreadCrumb';

const AppBreadCrumb = () => {
  const bradCrumbList = useBreadCrumb();
  return (
    <Breadcrumb
      items={bradCrumbList}
    />
  );
};

export default memo(AppBreadCrumb);