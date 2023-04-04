import { getSongUrl } from 'src/api/music';
import { useEffect, useState } from 'react';
import { message } from 'antd';

const useSongUrl = (songId:string) => {
  const [songUrl, setSongUrl] = useState('');
  useEffect(() => {
    async function anyNameFunction(id:string) {
      if (id) {
        const res = await getSongUrl(id);
        if (res.code === 200) {
          const { url } = res.data[0];
          if (!url) {
            message.info('无资源');
          }
          setSongUrl(url);
        }
      }
    }
    anyNameFunction(songId);
  }, [songId]);
  return [songUrl];
};

export {
  useSongUrl,
};
