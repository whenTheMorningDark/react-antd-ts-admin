
import { IRouter } from 'router';
import * as Icon from '@ant-design/icons';
import React from 'react';
import { cloneDeep } from 'lodash';
/**
 * 解析当前菜单对应的路由
 * @param path1
 * @param path2
 */
export const resolve = (path1 = '', path2 = '') => {
  let separator = '/';
  if (path1.endsWith('/') || path2.startsWith('/')) {
    separator = '';
  }
  return `${path1}${separator}${path2}`;
};
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
export const pathToParent = (tRouter: IRouter[], key: string) => {
  const result: any[] = [];
  function dfs(arr: any[], path: any[]) {
    if (!arr || arr.length === 0) {
      return;
    }
    for (const t of arr) {
      path.push(t);
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

export function getQueryObject(url?: string) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj: Record<string, any> = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

const iconToElement = (name: any) =>
  React.createElement(Icon && (Icon as any)[name], {
    style: { fontSize: '16px' }
  });
/**
 * 
 * @param routes 带过滤的菜单数组
 * @returns 过滤后的数据,排除hidden的菜单
 */
export const filterMenu = (routes: IRouter[]) => {
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

export const getParentKey = (routes: IRouter[]) => {
  const result: IRouter[] = [];
  function dfs(tRouter: IRouter[], path?: string) {
    if (!tRouter || tRouter.length === 0) {
      return;
    }
    for (let i = 0; i < tRouter.length; i++) {
      const item = tRouter[i];
      if (item.children && item.children.length > 0) {
        const parentPath = (path || '') + item.key;
        dfs(item.children, parentPath);
      } else {
        if (path && path.length > 0) {
          item.key = path + item.key;
        }
        if (!item.meta?.isFullPage) {
          result.push(item);
        }
      }
    }
  }
  dfs(cloneDeep(routes));
  return result;
};
