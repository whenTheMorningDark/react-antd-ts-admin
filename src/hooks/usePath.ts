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