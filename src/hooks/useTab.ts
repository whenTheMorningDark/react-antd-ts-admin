import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import router, { IRouter } from 'router';
import { useList } from 'hooks/useList';
import { filterMenu, getParentKey } from 'utils/path';
import { message } from 'antd';

const useTab = () => {
  const location = useLocation();
  const listPath = useMemo(() => getParentKey(filterMenu(router)), [router]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { list, push, remove } = useList<IRouter>([]);
  const jump = useCallback((path: string) => {
    navigate(path);
  }, []);
  useEffect(() => {
    const target = listPath.find(v => v.key === location.pathname);
    if (target) {
      const isHave = list.some(v => v.key === location.pathname);
      if (!isHave) {
        push(target);
      }
    }
  }, [location.pathname]);
  const delTab = useCallback((index: number) => {
    const current = list[index];
    const targetIndex = index - 1;
    if (current.key === location.pathname) {
      if (targetIndex > -1) {
        jump(list[targetIndex].key);
        remove(index);
      } else {
        messageApi.open({
          type: 'error',
          content: '不可删除',
        });
      }
    } else {
      remove(index);
    }
  }, [list]);
  return {
    list,
    delTab,
    contextHolder,
    pathname: location.pathname,
    jump
  };
};

export {
  useTab
};