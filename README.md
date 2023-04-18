
新建dashboard页面
上个章节已经完成了登录逻辑操作，管理后台的常见布局为左边菜单栏，右侧为内容区域。那么我们就针对该布局方式，进行深入讨论。
在router/modules，新建dashboard.ts，用于存储首页的路由数据，
import { lazy } from 'react';

const result = [
  {
    path: '/dashboard',
    meta: {
      title: '首页',
      Icon: '',
    },
    Component: lazy(() => import('pages/Dashboard')),
  },
];

export default result;

在pages/新建Dashboard页面
import React, { memo } from 'react';

const Dashboard = () => {
  console.log('Dashboard');
  return (
    <div>Dashboard</div>
  );
};

export default memo(Dashboard);
此时在浏览器输入 http://localhost:4000/dashboard 便可以看到dashboard的信息了
menu组件开发
这里还是选取的antd中的menu组件
import React, { memo } from 'react';
import { Menu } from 'antd';
import router, { IRouter } from 'router';
import { useNavigate, useLocation } from 'react-router-dom';
import { resolve } from 'utils/path';
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd/es/menu';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Navigation One', '1', <MailOutlined />),
  getItem('Navigation Two', '2', <CalendarOutlined />),
  getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('Navigation Three', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
  getItem(
    <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
      Ant Design
    </a>,
    'link',
    <LinkOutlined />,
  ),
];

const defaultMenu = () => {
  console.log('Menu');
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode='inline'
      items={items}
    />
  );
};

export default memo(defaultMenu);
然后再AppLayOut引入menu组件，
import React from 'react';
import AppRouter from '../AppRouter';
import Menu from '../Menu';
const FullPageLayout = () => (
  <React.Fragment>
    <Menu />
    <AppRouter />
  </React.Fragment>
);

export default FullPageLayout;
当我们访问 http://localhost:4000/dashboard 是能够出来dashboard页面的，但是当我们访问http://localhost:4000/login的时候，它的侧边栏菜单还是出现了，这并不符合我们的预期。还记得我们在IRouter中定义了isFullPage字段，这个时候isFullPage就起到了作用。
接下来就修改appRouter中的代码，
....
if (Component) {
      // 有路由菜单
      return (
        <Route
          key={index}
          path={currentPath}
          element={
            <Page isFullPage={route.isFullPage}>
              <Component />
            </Page>
          }
        />
      );
    }
...
添加Page组件，由于我们访问地址的时候，就已经进入到了Route组件了，我们通过element中的Page组件，告知外部你当前的页面是否isFullPage，如果是true，则通知到AppLayout组件，改变布局的方式。类似这样的跨组件通信的方式，在React中有很多工具，我们在这里选择了@reduxjs/toolkit


toolkit跨组件通信
npm i @reduxjs/toolkit  react-redux --save
在src目录下新建modules/stores，创建toolkit是有专门的套路模板的
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import global from './global';

const reducer = combineReducers({
  global,
});

export const store = configureStore({
  reducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
modules/global
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
const namespace = 'global';
export interface IGlobalState {
  layout: string,
  isFullPage: boolean
}
const initialState: IGlobalState = {
  layout: '1',
  isFullPage: false,
};

// 创建带有命名空间的reducer
const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
  },
  extraReducers: () => { },
});


export const selectGlobal = (state: RootState) => state.global;


// export const { } = globalSlice.actions;


export default globalSlice.reducer;
你只需要知道在globalSlice的reducers，执行的是同步方法，在extraReducers执行异步方法即可（后面会有操作）
在main.ts中注入store，此时需要借助react-redux中的Provider
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'layouts/index';
import './styles/reset.less';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'modules/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
我们回到src\layouts\components\pages\index.tsx文件下，此时我们是已经能够知道页面是否需要侧边栏的了，那么我们就在这个过程发起dispatch即可
在src\modules\global\index.ts的reducers，添加switchFullPage方法，用来修改当前是否有侧边栏状态
...
reducers: {
    switchFullPage: (state, action) => {
      state.isFullPage = !!action?.payload;
    },
  },


export const { switchFullPage } = globalSlice.actions;
...
在src\layouts\components\pages\index.tsx
import { useAppDispatch } from 'modules/store';
import { switchFullPage } from 'modules/global';
...
const Page = (props: React.PropsWithChildren<PageProps>) => {
  const { isFullPage, children } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(switchFullPage(isFullPage));
  }, [isFullPage]);
  if (isFullPage) {
    return <>{children}</>;
  }
  return (
    <Content>
    {children}
    </Content>
  );
};
修改AppLayout逻辑

import React from 'react';
import AppRouter from '../AppRouter';
import Menu from '../Menu';

const SideLayout = React.memo(() => (
  <div className='layout-sidebar'>
    <Menu />
    <AppRouter />
  </div>


));

const FullPageLayout = React.memo(() => (
  <React.Fragment>
    <AppRouter />
  </React.Fragment>
));

export default {
  SideLayout,
  FullPageLayout
};
在src\layouts\index.tsx，修改对应业务
import React from 'react';
import './index.less';
import { selectGlobal } from 'modules/global';
import { useAppSelector } from 'modules/store';
import AppLayout from './components/AppLayout';

const Layouts = () => {
  const globalState = useAppSelector(selectGlobal);
  const AppContainer = globalState.isFullPage ? AppLayout.FullPageLayout : AppLayout.SideLayout;
  return (
    <div className='layouts-page'>
      <AppContainer />
    </div>
  );
};

export default Layouts;
那么在这个时候就能发现，dashboard的页面是有侧边栏，而login是没有的。
代码地址：https://github.com/whenTheMorningDark/react-antd-ts-admin/tree/2-menu-router
动态菜单
在src\layouts\components\Menu\index.tsx文件，过滤isFullPage和hidden的数据
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
  delete v.Component，如果不删除Component属性的话，控制台会出现一个警告，所以我们先对原数组做一个深拷贝。
然后我们就在pages下新建Result文件夹，放置403和404页面


errorPage代码
https://github.com/whenTheMorningDark/react-antd-ts-admin/tree/2-menu-router/src/components
需要注意的是，我们是通过SVG引入的图片资源，所以需要在vite.config.ts中添加vite-plugin-svgr 插件
import svgr from 'vite-plugin-svgr';
...
export default defineConfig({
  ...
  plugins: [svgr(), react(), eslint()],
  ...
})
进入到router/index.ts配置对应的result的路由即可。
result.ts
import { lazy } from 'react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    key: '/result',
    label: '结果页',
    children: [

      {
        key: '403',
        Component: lazy(() => import('pages/Result/403')),
        label: '403',
      },
      {
        key: '404',
        Component: lazy(() => import('pages/Result/404')),
        label: '404'
      },
    ],
  },
];

export default result;
在浏览器输入对应的地址http://localhost:4000/result/403，即可出现对应的页面

自定义Icon
由于我们的菜单，往往都是后端的同事返回，而且icon，往往是字符串的形式，但是在antd的men中的Icon是具体的Icon组件，所以就必须全量导入Icon的形式。
import * as Icon from '@ant-design/icons';
const iconToElement = (name: any) =>
  React.createElement(Icon && (Icon as any)[name], {
    style: { fontSize: '16px' }
  });
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
菜单高亮
当我们访问 http://localhost:4000/result/403 的时候，菜单没有自己展开，并且没有给高亮的状态，在antd的menu组件中，主要是defaultSelectedKeys字段控制菜单是否给选中
useLocation
useLocation 是react-router-dom中自带的Hook，用来获取当前URL的信息,通过useState可定义defaultSelectedKeys 
通过useEffect检测location.pathname变化时，赋值defaultSelectedKeys
const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('');
const location = useLocation();
useEffect(() => {
    const targetPath = getActivePath(location.pathname);
    setDefaultSelectedKeys(targetPath);
  }, [location.pathname]);

<Menu
      style={{ width: 256 }}
      selectedKeys={[defaultSelectedKeys]}
      openKeys={openKeys}
      mode='inline'
      items={filterMenu(router)}
      onClick={menuClick}
      onOpenChange={onOpenChange}
    />
utils/path.ts下的getActivePath
/**
 * 获取当前激活的路由
 * @param pathName
 */
export const getActivePath = (pathName: string) => {
  if (!pathName || pathName.length === 0) {
    return '';
  }
  const splitPath = pathName.split('/');
  return `/${splitPath[splitPath.length - 1]}`;
};
默认打开菜单openKeys
当我停留在二级路由页面时，然后刷新页面发现，并没有展开根目录，在antd的menu中，针对展开收起的操作，是通过openKeys实现的，并且是需要自己实现业务逻辑代码，这个时候，需要注意和onOpenChange方法结合在一起，否则会出现无法点击展开的情况。
const onOpenChange = (keys: string[]) => {
  if (keys.length > openKeys.length) {
    setOpenKeys(keys);
  } else {
    setOpenKeys(keys.filter((key) => openKeys.indexOf(key) !== -1));
  }
};
<Menu
      style={{ width: 256 }}
      selectedKeys={[defaultSelectedKeys]}
      openKeys={openKeys}
      mode='inline'
      items={filterMenu(router)}
      onClick={menuClick}
      onOpenChange={onOpenChange}
    />
当我们location.pathname发生变化的时候，是需要重新打开该路径下的全部子节点的。
useEffect(() => {
  const targetPath = getActivePath(location.pathname);
  setDefaultSelectedKeys(targetPath);
  const defaultOpenKeys = pathToParent(router, targetPath);
  setOpenKeys([...defaultOpenKeys, ...openKeys]);
}, [location.pathname]);
utils/path
export const pathToParent = (tRouter: IRouter[], key: string) => {
  const result: any[] = [];
  function dfs(arr: any[], path: any[]) {
    if (!arr || arr.length === 0) {
      return;
    }
    for (const t of arr) {
      path.push(t.key);
      if (t.key === key) {
        result.push(...path);
      }
      if (t.children && t.children.length > 0) {
        dfs(t.children, path);
      }
      path.pop(); // 路径回溯
    }
  }
  dfs(tRouter, []);
  return result;
};
pathToParent 只要是采取递归回溯的方式，通俗一点来说，就是该方法通过一个key，来获取该链路的父节点。
