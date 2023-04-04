import React from 'react';
import './index.less';
import { PlayCircleOutlined } from '@ant-design/icons';
import { setDrawProps } from 'src/store/slice/draw';
// useAppSelector
import { useAppDispatch } from 'src/store/hook';
import { fetchPostsAsync } from 'src/store/action/musicAction';
import { getListDataSong } from 'src/store/slice/music';

type baseProps = {
  picUrl:string
  name:string
  id:string | number
}

interface listProps {
  list:baseProps[]
}

function List(props:listProps) {
  const { list } = props;
  const dispatch = useAppDispatch();
  // const songList = useAppSelector((state) => state.music.songList);
  const showDrawer = (id:string | number) => {
    dispatch(fetchPostsAsync(id));
    console.log('www');
    dispatch(setDrawProps(
      {
        open:
        true,
        title: '歌曲详情',
        width: 840,
        children: 'ListDetail',
        propsData: {
          id,
        },
      },
    ));
  };
  const handlePlay = (e:React.MouseEvent, v:any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    // tabAction.delTab(v);
    console.log(v, 'w');
    dispatch(getListDataSong(v.id));
    // dispatch(setSongData({ songData: { id: v.id } }));
  };

  return (
    <div className='listWrapper'>
      {
        list && list.map((v) => (
          <div className='list-item' key={v.id} onClick={() => showDrawer(v.id)}>
            <div className='list-item-pic'>
              <img
                src={v.picUrl}
                width='100%'
                height='100%'
                alt=''
              />
            </div>
            <div className='list-item-desc'>
              {v.name}
            </div>
            <PlayCircleOutlined className='play-icon' onClick={(event) => handlePlay(event, v)} />
          </div>
        ))
      }
    </div>
  );
}
export default List;
