import React, { memo } from 'react';
import { Menu } from 'antd';
import router, { IRouter } from 'router';

const filterMenu = (routes: IRouter[]) => {
  const tRouters: IRouter[] = JSON.parse(JSON.stringify(routes));
  return tRouters.filter(v => {
    delete v.Component;
    if (v.children && v.children.length > 0) {
      filterMenu(v.children);
    }
    return !v.isFullPage || !v.meta?.hidden;
  });
};



const defaultMenu = () => (
  <Menu
    style={{ width: 256 }}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    mode='inline'
    items={filterMenu(router)}
  />
);

export default memo(defaultMenu);