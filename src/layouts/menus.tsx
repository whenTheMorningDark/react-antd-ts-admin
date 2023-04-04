/* eslint-disable max-len */
import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { menus } from 'src/menus';
import { menuActionType } from 'src/hooks/tabMenuHook';

interface IProps {
  collapsed: boolean;
  menuAction: menuActionType;
  currentKey: string;
  openKeys: string[];
}
function Menus(props: IProps) {
  const { collapsed, menuAction, currentKey, openKeys } = props;

  const onClick: MenuProps['onClick'] = (e) => {
    menuAction.setCallActiveKeys(e.key);
  };
  const onOpenChange = (openKeysTarget: string[]) => {
    menuAction.setCallOpenKeys(openKeysTarget);
  };
  return (
    <Menu
      theme='dark'
      onClick={onClick}
      style={{ width: 256 }}
      openKeys={openKeys}
      selectedKeys={[currentKey]}
      mode='inline'
      items={menus}
      onOpenChange={onOpenChange}
      inlineCollapsed={collapsed}
    />
  );
}

export default Menus;
