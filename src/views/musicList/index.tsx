import React from 'react';
import { useRequest } from 'ahooks';
import { getPrsonalized } from 'src/api/music';
import './index.less';
import HeaderTitle from 'src/components/headerTitle';
import List from './list/index';

function MusicList() {
  const { data } = useRequest(getPrsonalized);

  if (!data) {
    return null;
  }
  console.log(data.result, 'data');
  return (
    <div className='musicList'>
      <HeaderTitle />
      <List list={data.result} />
    </div>
  );
}

export default MusicList;
