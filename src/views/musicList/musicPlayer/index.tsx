/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { PlayCircleOutlined, StepBackwardOutlined, StepForwardOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from 'src/store/hook';
import MusicProgress from './components/musicProgress';

function MusicPlayer() {
  console.log('MusicPlayer');
  const currentSong = useAppSelector((state) => state.music.currentSong);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playStatus, setPlatStatus] = useState(false);
  // const [progressProps, setProgressProps] = useState<musicProgressProps>({
  //   picUrl: '',
  //   name: '',
  // });
  const playMusic = () => {
    setPlatStatus(!playStatus);
  };
  console.log(currentSong, 'currentSong');
  useEffect(() => {
    if (audioRef.current && currentSong.url) {
      audioRef.current.src = currentSong.url;
      audioRef.current.play();
      setPlatStatus(true);
      // setProgressProps((prveState) => ({
      //   ...prveState,
      //   ...currentSong,
      // }));
      // setProgressProps({
      //   picUrl: currentSong.src,
      //   name: currentSong.title,
      // });
    }
  }, [currentSong]);
  useEffect(() => {
    if (audioRef.current) {
      if (playStatus) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playStatus]);
  return (
    <div className='bottom-player'>
      <div className='player-wrapper'>
        <div className='player-btns'>
          <StepBackwardOutlined />
          {
            playStatus
              ? <PauseCircleOutlined onClick={playMusic} />
              : <PlayCircleOutlined onClick={playMusic} />
          }

          <StepForwardOutlined />
        </div>
        <MusicProgress {...currentSong} />

      </div>

      <audio
        ref={audioRef}
      />
    </div>
  );
}

export default MusicPlayer;
