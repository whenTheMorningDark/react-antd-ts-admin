import React from 'react';
import { useOutlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/store/hook';
import { usePathName } from 'src/hooks/tabMenuHook';
import { Drawer } from 'antd';
import { setDrawProps } from 'src/store/slice/draw';
import ListDetail from 'src/views/musicList/listDetail';
import MusicPlayer from 'src/views/musicList/musicPlayer';
import SettingDetail from 'src/layouts/layoutsHeader/setting/settingDetail';
import classNames from 'classnames';
import Menus from './menus';
import LayoutsHeader from './layoutsHeader';
import LayoutsTab from './layoutsTab';
import './index.less';

const MenusMemoized = React.memo(Menus);

export default function Layouts() {
  const menu = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const drawData = useAppSelector((state) => state.draw);
  const { openKeys, currentKey, menuAction, tab, tabAction } = usePathName();
  const outlet = useOutlet();
  const layOutCls = classNames('layout-container', {
    'is-hidden': menu.toggle,
  });

  const onClose = () => {
    dispatch(setDrawProps({
      open: false,
    }));
  };
  return (
    <div className={layOutCls}>
      <div className='layout-menu'>
        <MenusMemoized
          collapsed={menu.toggle}
          menuAction={menuAction}
          currentKey={currentKey}
          openKeys={openKeys}
        />
      </div>
      <div className='layout-wrapper'>
        <LayoutsHeader />
        <LayoutsTab tab={tab} tabAction={tabAction} />
        <div className='layout-wrapper-main'>{outlet}</div>
      </div>
      <MusicPlayer />
      <Drawer
        {...drawData.drawProps}
        onClose={onClose}
      >
        {
          drawData.drawProps.children === 'ListDetail' && <ListDetail />
        }
        {
          drawData.drawProps.children === 'settingDetail' && <SettingDetail />
        }

      </Drawer>
    </div>
  );
}
