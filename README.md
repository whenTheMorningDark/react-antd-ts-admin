实现面包屑的功能，主要使用到的组件是antd中，breadcrumb组件
# 基本用法
在layouts下新建components/AppBreadCrumb组件，
```typescript
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
```
在这里主要使用了自定义HOOK，useBreadCrumb方法。
```typescript
import { usePath } from 'hooks/usePath';
import { useMemo } from 'react';


const useBreadCrumb = () => {
  const { pathKeys } = usePath();
  const bradCrumbList = useMemo(() => pathKeys.map(v => {
    v.url = v.key;
    v.title = v.label;
    return v;
  }), [pathKeys]);
  return bradCrumbList;
};
export {
  useBreadCrumb
};
```
而在该HOOK中，也是使用到了usePath
```typescript
import { useMemo } from 'react';
import { pathToParent, getActivePath } from 'utils/path';
import router from 'router';
import { useLocation } from 'react-router-dom';

const usePath = () => {
  const location = useLocation();
  return useMemo(() => {
    const targetPath = getActivePath(location.pathname);
    const pathKeys = pathToParent(router, targetPath);
    return { pathKeys, targetPath };
  }, [location.pathname]);
};

export {
  usePath
};
```
usePath主要是用来处理，当前URL路径父节点们的数据情况。我们在menu组件的时候，也出现了类似场景，也可以考虑把菜单的操作，做成一个自定义HOOK
在layouts/Menu中
```typescript
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
```
新增了useMenu自定义HOOK，
在useMenu中
```typescript
import { usePath } from 'hooks/usePath';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
const useMenu = () => {
  const location = useLocation();
  const { pathKeys, targetPath } = usePath();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const action = useMemo(() => {
    const onOpenChange = (keys: string[]) => {
      if (keys.length > openKeys.length) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(keys.filter((key) => openKeys.indexOf(key) !== -1));
      }
    };
    return {
      onOpenChange
    };
  }, []);
  useEffect(() => {
    setDefaultSelectedKeys(targetPath);
    const defaultOpenKeys = pathKeys.map(v => v.key);
    setOpenKeys([...defaultOpenKeys, ...openKeys]);
  }, [location.pathname]);
  return {
    defaultSelectedKeys,
    openKeys,
    pathKeys,
    action,
  };


};


export { useMenu };
```
自此，我们就抽离了3个自定义HOOK，分别为usePath,useBreadCrunmb,useMenu
