import React, { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './index.less';
import router, { IRouter } from 'router';
import { filterMenu, getParentKey } from 'utils/path';
import { useList } from 'hooks/useList';
import { useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';

const AppTab = () => {
  const location = useLocation();
  const listPath = getParentKey(filterMenu(router));
  const navigate = useNavigate();
  const { list, push } = useList<IRouter>([]);
  useEffect(() => {
    const target = listPath.find(v => v.key === location.pathname);
    if (target) {
      const isHave = list.some(v => v.key === location.pathname);
      if (!isHave) {
        push(target);
      } else {
        navigate(location.pathname);
      }
    }
  }, [location.pathname]);
  return (
    <div className='tabList'>
      {
        list.map((v, index) => (
          <div key={index} className={classnames('tabList-item', {
            active: location.pathname === v.key
          })}>
            <span>{v.label}</span>
            <CloseOutlined />
          </div>
        ))
      }
    </div>
  );
};

export default AppTab;