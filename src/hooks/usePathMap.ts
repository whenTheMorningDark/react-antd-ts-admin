import { useMemo, useState } from 'react';
import { menus, ISideMenu } from 'src/menus';

function dfsMenuToPathMap<T extends ISideMenu[]>(IMenus: T) {
  const result: Record<string, any> = {};
  function dfs(targetArr: T) {
    if (!targetArr || targetArr.length === 0) {
      return;
    }
    for (const data of targetArr) {
      result[data.key] = data;
      if (data.children && data.children.length > 0) {
        dfs(data.children as unknown as T);
      }
    }
  }
  dfs(IMenus);
  return result;
}

const usePathMap = () => {
  const [pathMapMemoized, setPathMapMemoized] = useState<Record<string, ISideMenu>>({});
  useMemo(() => {
    const res = dfsMenuToPathMap(menus);
    setPathMapMemoized(res);
  }, []);
  return [pathMapMemoized];
};
export { usePathMap };
