import React, { memo, useEffect } from 'react';
import { Menu } from 'antd';
import router, { IRouter } from 'router';
import { useNavigate } from 'react-router-dom';
import * as Icon from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAppSelector } from 'modules/store';
import { useMenu } from 'hooks/useMenu';

const iconToElement = (name: any) =>
  React.createElement(Icon && (Icon as any)[name], {
    style: { fontSize: '16px' }
  });
/**
 * 
 * @param routes 带过滤的菜单数组
 * @returns 过滤后的数据,排除hidden的菜单
 */
const filterMenu = (routes: IRouter[]) => {
  const targetRoutes: IRouter[] = JSON.parse(JSON.stringify(routes));
  return targetRoutes.filter(route => {
    delete route.Component;
    route.icon = route.icon ? iconToElement(route.icon) : '';
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
  const { defaultSelectedKeys, openKeys, pathKeys, action } = useMenu();
  const navigate = useNavigate();
  const global = useAppSelector((state) => state.global);
  const menuClick: MenuProps['onClick'] = (item) => {
    const pathKey = item.keyPath.reverse().join('');
    navigate(pathKey);
  };
  const onOpenChange = (keys: string[]) => {
    action.onOpenChange(keys);
  };
  useEffect(() => {
    if (!global.isToggle) {
      const defaultOpenKeys = pathKeys.map(v => v.key);
      action.onOpenChange(defaultOpenKeys);
    }
  }, [global.isToggle]);
  return (
    <Menu
      style={{ width: global.isToggle ? 80 : 256 }}
      selectedKeys={[defaultSelectedKeys]}
      openKeys={openKeys}
      mode='inline'
      items={filterMenu(router)}
      onClick={menuClick}
      onOpenChange={onOpenChange}
      inlineCollapsed={global.isToggle}
    />
  );
};

export default memo(defaultMenu);