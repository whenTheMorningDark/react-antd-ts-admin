import { useEffect, useMemo } from 'react';
import { usePathMap } from 'src/hooks/usePathMap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/store/hook';
import { setTabActive, addTabList, delTabList, tabProps } from 'src/store/slice/tab';
import { setOpenKeys } from 'src/store/slice/menu';
import { dfsParent } from 'src/router/utils';
import { menus } from 'src/menus';

export interface menuActionType {
  setCallOpenKeys: (pathname: string[]) => void;
  setCallActiveKeys: (key: string) => void;
}

export interface tabActionType {
  setTab: (v: tabProps) => void;
  delTab: (v: tabProps) => void;
}

/**
 * @description 处理url路径发生的变化
 * @returns null
 */
function usePathName() {
  const [pathMapMemoized] = usePathMap();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tab = useAppSelector((state) => state.tab);
  const menu = useAppSelector((state) => state.menu);
  const menuAction = useMemo(() => {
    const setCallOpenKeys = (pathnameKeys: string[]) => {
      if (!pathnameKeys || pathnameKeys.length === 0) {
        return;
      }
      dispatch(setOpenKeys(pathnameKeys));
    };
    const setCallActiveKeys = (keys: string) => {
      const t = pathMapMemoized[keys];
      const target = {
        path: t.key,
        name: t.label,
      };
      dispatch(addTabList(target));
      dispatch(setTabActive({ path: keys }));
    };
    return {
      setCallOpenKeys,
      setCallActiveKeys,
    };
  }, [dispatch, pathMapMemoized]);
  const tabAction = useMemo(() => {
    const setTab = (v: tabProps) => {
      dispatch(setTabActive({ path: v.path }));
    };
    const delTab = (v: tabProps) => {
      dispatch(delTabList(v));
    };
    return {
      setTab,
      delTab,
    };
  }, [dispatch]);

  useEffect(() => {
    menuAction.setCallActiveKeys(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (tab.activeKey.length === 0) {
      return;
    }
    const parentKeys = dfsParent(menus, tab.activeKey);
    if (parentKeys && parentKeys[0].length > 1) {
      const parentArrKeys = parentKeys[0];
      const concatArr = [...new Set([...menu.openKeys, ...parentArrKeys])];
      menuAction.setCallOpenKeys(concatArr);
    }
    navigate(tab.activeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab.activeKey]);

  return {
    tab,
    currentKey: tab.activeKey,
    openKeys: menu.openKeys,
    menuAction,
    tabAction,
  };
}

export { usePathName };
