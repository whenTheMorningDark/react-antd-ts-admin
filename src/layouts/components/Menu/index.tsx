import React, { memo, useEffect } from 'react';
import { Menu } from 'antd';
import router from 'router';
import { useNavigate } from 'react-router-dom';

import type { MenuProps } from 'antd';
import { useAppSelector } from 'modules/store';
import { useMenu } from 'hooks/useMenu';
import { filterMenu } from 'utils/path';


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
      theme={global.theme}
    />
  );
};

export default memo(defaultMenu);