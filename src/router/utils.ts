import { ISideMenu } from 'src/menus';
import type { RouteObject } from 'react-router-dom';
/**
 * 路由添加layout
 * @param routes - 路由数据
 */
function layoutRoutes(routes: ISideMenu[]): RouteObject[] {
  const layouts: RouteObject[] = []; // layout内部组件

  for (const route of routes) {
    const json = {
      element: route.element,
      path: route.children && route.children.length > 0 ? `${route.key}/*` : route.name || '',
      children: route.children && route.children.length > 0 ? layoutRoutes(route.children) : [],
    };
    layouts.push(json);
  }
  return layouts;
}

/**
 * @description 回溯寻找父节点
 */
type typeFun = (params: ISideMenu, path: any[]) => void

function dfsParent(dfsMenus: ISideMenu[], targetId: string, cb?: typeFun) {
  const result: any[] = [];
  function dfs(arr: any[], path: any[]) {
    if (!arr || arr.length === 0) {
      return;
    }
    for (const t of arr) {
      if (cb) {
        cb(t, path);
      } else {
        path.push(t.name);
      }
      if (t.key === targetId) {
        result.push([...path]);
      }
      if (t.children && t.children.length > 0) {
        dfs(t.children, path);
      }
      path.pop(); // 路径回溯
    }
  }
  dfs(dfsMenus, []);
  return result;
}

export { layoutRoutes, dfsParent };
