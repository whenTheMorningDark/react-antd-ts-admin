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