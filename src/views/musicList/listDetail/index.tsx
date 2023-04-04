import React from 'react';
import './index.less';
import dayjs from 'dayjs';
import { tranNumber } from 'src/utils/common';
import { useAppSelector } from 'src/store/hook';
import ListTab from '../listTab';

export interface DetailProps {
  id:string | number
}

function DetailHeader() {
  console.log('DetailHeader');
  const detailsData = useAppSelector((state) => state.music.detailsData);
  const {
    algTags,
    coverImgUrl,
    description,
    name,
    creator,
    createTime,
    trackCount,
    playCount,
  } = detailsData;
  return (
    <div className='detail-header'>
      <div className='header-image'>
        <img
          src={coverImgUrl}
          alt=''
        />
      </div>
      <div className='header-right'>
        <h2 className='right-title'>
          {name}
        </h2>
        <div className='header-creator'>
          <div className='image'>
            <img
              src={creator.avatarUrl}
              alt=''
              width='100%'
              height='100%'
            />
          </div>
          <span className='author'>
            {creator.nickname}
          </span>
          <span className='create-time'>
            {dayjs(createTime).format('YYYY-MM-DD')}

          </span>
        </div>

        <div className='tags'>
          <span className='tags-label'>
            标签:
          </span>
          <span className='value value-blue'>
            {
            algTags && algTags.length > 0 ? algTags.join('/') : null
          }
          </span>
        </div>
        <div className='tags'>
          <div className='tabs-item'>
            <span className='tags-label'>
              歌曲:
            </span>
            <span>{trackCount}</span>
          </div>
          <div className='tabs-item'>
            <span className='tags-label'>
              播放:
            </span>
            <span>{tranNumber(playCount, 0)}</span>
          </div>
        </div>
        <div className='tags'>
          <span className='tags-label'>
            简介:
          </span>
          <span className='value'>
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}

function ListDetail() {
  const songList = useAppSelector((state) => state.music.songList);
  console.log(songList, 'songList');

  return (
    <div className='music-detail'>
      <div className='music-detail-wrapper'>
        <DetailHeader />
        <ListTab list={songList} />
      </div>
    </div>
  );
}

export default ListDetail;
