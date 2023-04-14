import React, { memo } from 'react';
import { Menu } from 'antd';
import router, { IRouter } from 'router';
import { useLocation, useNavigate } from 'react-router-dom';
import { getActivePath, pathToParent } from 'utils/path';
import { HomeOutlined, ReconciliationOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const iconMap = {
  HomeOutlined: <HomeOutlined />
};
const filterMenu = (routes: IRouter[]) => {
  const targetRoutes: IRouter[] = JSON.parse(JSON.stringify(routes));
  return targetRoutes.filter(route => {
    delete route.Component;
    const iconType = route.icon as keyof typeof iconMap;
    route.icon = route.icon ? iconMap[iconType] : <ReconciliationOutlined />;
    if (route.meta?.hidden) {
      return false; // 过滤掉隐藏路由项
    }
    if (route.children?.length) {
      route.children = filterMenu(route.children); // 递归处理子路由
    }
    return true; // 保留其他路由项
  });
};



const defaultMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultSelectedKeys = getActivePath(location.pathname);
  const defaultOpenKeys = pathToParent(router, defaultSelectedKeys);
  const lastOpenKeys = defaultOpenKeys.slice(0, defaultOpenKeys.length - 1);
  const menuClick: MenuProps['onClick'] = (item) => {
    const pathKey = item.keyPath.reverse().join('');
    navigate(pathKey);
  };
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={[defaultSelectedKeys]}
      defaultOpenKeys={lastOpenKeys}
      mode='inline'
      items={filterMenu(router)}
      onClick={menuClick}
    />
  );
};

export default memo(defaultMenu);