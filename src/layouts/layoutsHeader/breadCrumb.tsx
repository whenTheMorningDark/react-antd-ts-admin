import React from 'react';
import { Breadcrumb } from 'antd';
import { useBreadcrumb } from 'src/hooks/useBreadcrumb';

function BreadCrumb() {
  const breadcrumbList = useBreadcrumb();
  const item = breadcrumbList;
  return (
    <Breadcrumb
      items={item}
      style={{ marginLeft: '13px' }}
    />
  );
}

export default BreadCrumb;
