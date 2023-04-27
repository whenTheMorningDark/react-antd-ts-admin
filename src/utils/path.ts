
import { IRouter } from 'router';
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
