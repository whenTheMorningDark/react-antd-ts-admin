import React from 'react';
import './index.less';
import { Tabs } from 'antd';

import SongList from './songList';

interface listTabProps {
  list:any[]
}

function ListTab(props:listTabProps) {
  console.log('ListTab');
  const { list } = props;

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className='ListTab'>
      <Tabs defaultActiveKey='1' onChange={onChange}>
        <Tabs.TabPane key='1' tab='歌曲列表'>
          <SongList list={list} />
        </Tabs.TabPane>
        <Tabs.TabPane key='2' tab='评论'>
          评论
        </Tabs.TabPane>
        <Tabs.TabPane key='3' tab='收藏者'>
          收藏者
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
export default React.memo(ListTab);
