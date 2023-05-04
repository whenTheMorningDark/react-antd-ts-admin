import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './index.less';
import { useTab } from 'hooks/useTab';
import classnames from 'classnames';

const AppTab = () => {
  const { list, contextHolder, delTab, pathname, jump } = useTab();
  const close = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    delTab(index);
  };

  return (
    <div className='tabList'>
      {contextHolder}
      {
        list.map((v, index) => (
          <div key={index} className={classnames('tabList-item', {
            active: pathname === v.key
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