import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import './index.less';
import { tabProps, tabState } from 'src/store/slice/tab';
import { tabActionType } from 'src/hooks/tabMenuHook';
import classNames from 'classnames';

interface LayoutsTabProps {
  tab: tabState;
  tabAction: tabActionType;
}

function LayoutsTab(props: LayoutsTabProps) {
  const { tab, tabAction } = props;

  const handleItemClick = (v: tabProps) => {
    tabAction.setTab(v);
  };

  const handleDel = (e: React.MouseEvent, v: tabProps) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    tabAction.delTab(v);
  };

  return (
    <div className='layouts-tab'>
      {tab.tabList.map((v) => (
        <div
          className={classNames('layouts-tab-item', {
            active: tab.activeKey === v.path,
          })}
          key={v.name}
          onClick={() => handleItemClick(v)}
        >
          <span>{v.name}</span>
          <CloseCircleOutlined className='circleDel' onClick={(e) => handleDel(e, v)} />
        </div>
      ))}
    </div>
  );
}
const LayoutsTabMemoized = React.memo(LayoutsTab);
export default LayoutsTabMemoized;
