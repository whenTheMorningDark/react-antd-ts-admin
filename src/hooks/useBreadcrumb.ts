import { useLocation } from 'react-router-dom';
import { dfsParent } from 'src/router/utils';
import { menus } from 'src/menus';

const useBreadcrumb = () => {
  const { pathname } = useLocation();
  let breadcrumbList = [];
  const menuMap = dfsParent(menus, pathname, (t, path) => {
    path.push(t);
  });
  if (menuMap.length > 0) {
    breadcrumbList = menuMap[0].map((v) => ({
      url: v.key,
      title: v.label,
    }));
  }
  return breadcrumbList;
};

export { useBreadcrumb };
