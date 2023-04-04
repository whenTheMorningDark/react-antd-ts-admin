import React from 'react';
import { Image, List, Descriptions } from 'antd';
import './index.less';
import { PlayCircleOutlined } from '@ant-design/icons';
import { getSongUrlAsync } from 'src/store/action/musicAction';
import { useAppDispatch } from 'src/store/hook';

interface listTabProps {
  list:any[]
}

function SongList(props:listTabProps) {
  console.log('SongList', props.list);
  const dispatch = useAppDispatch();
  const play = (id:string) => {
    console.log('11', id);

    dispatch(getSongUrlAsync(id));
  };

  const { list } = props;
  return (
    <List
      itemLayout='vertical'
      size='large'
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <PlayCircleOutlined
              key='list-vertical-star-o'
              style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={() => play(item.id)}
            />,
          ]}
          extra={(
            <Image
              width={208}
              alt='logo'
              src={item.src}
            />
        )}
        >
          <List.Item.Meta
            title={<a href={item.title}>{item.title}</a>}
            description={item.alName}
          />

          <Descriptions>
            <Descriptions.Item label='歌手'>
              {item.arName}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label='时长'>
              {item.duration}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label='发布时间'>
              {item.publish}
            </Descriptions.Item>
          </Descriptions>
        </List.Item>
      )}
    />
  );
}

export default React.memo(SongList);
