import React, { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './index.less';
import router, { IRouter } from 'router';
import { filterMenu, getParentKey } from 'utils/path';
import { useList } from 'hooks/useList';
import { useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { message } from 'antd';

const AppTab = () => {
  const location = useLocation();
  const listPath = getParentKey(filterMenu(router));
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { list, push, remove } = useList<IRouter>([]);
  const jump = (path: string) => {
    navigate(path);
  };
  const close = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
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
  };
  useEffect(() => {
    const target = listPath.find(v => v.key === location.pathname);
    if (target) {
      const isHave = list.some(v => v.key === location.pathname);
      if (!isHave) {
        push(target);
      } else {
        jump(location.pathname);
      }
    }
  }, [location.pathname]);
  return (
    <div className='tabList'>
      {contextHolder}
      {
        list.map((v, index) => (
          <div key={index} className={classnames('tabList-item', {
            active: location.pathname === v.key
          })} onClick={() => jump(v.key)}>
            <span>{v.label}</span>
            <CloseOutlined onClick={(e) => close(e, index)} style={{ fontSize: 14 }} />
          </div>
        ))
      }
    </div>
  );
};

export default AppTab;