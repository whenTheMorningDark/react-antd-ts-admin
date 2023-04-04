import React, { useRef } from 'react';
import './music.less';

import { currentProps } from 'src/store/slice/music';

const touch = {
  initiated: false,
  startX: 0,
  left: 0,
  isLeft: true,
};
function MusicProgress(props:currentProps) {
  const { title, src, arName } = props;
  const progressBar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const btnWrapper = useRef<HTMLDivElement>(null);
  const offset = (offsetWidth:number) => {
    if (progress.current) {
      progress.current.style.width = `${offsetWidth}px`;
    }
  };
  const progressClick = (e:React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!progressBar.current || target.className === 'progress-btn') {
      return;
    }
    const rect = progressBar.current.getBoundingClientRect();
    if (rect) {
      const offsetWidth = e.pageX - rect.left;
      offset(offsetWidth);
    }
  };
  const btnMouseMove = (e:MouseEvent) => {
    if (!touch.initiated || !progressBar.current) return;
    const deltaX = e.pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    offset(offsetWidth);
  };
  const btnMouseEnd = () => {
    if (!progress.current) {
      return;
    }
    touch.initiated = false;
    document.removeEventListener('mousemove', btnMouseMove);
    document.removeEventListener('mouseup', btnMouseEnd);
  };

  const btnMouseDown = (e:React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!progress.current || target.className !== 'progress-btn') {
      return;
    }
    touch.initiated = true;
    touch.startX = e.pageX;
    touch.left = progress.current.clientWidth;
    document.addEventListener('mousemove', btnMouseMove);
    document.addEventListener('mouseup', btnMouseEnd);
  };

  return (
    <div className='musicProgress'>
      <div className='musicProgress-pic'>
        <img
          src={src}
          alt=''
        />
      </div>
      <div className='musicProgress-name-progress'>
        <div className='musicProgress-name'>
          <span className='title'>{title}</span>
          <span className='arName'>{arName}</span>
        </div>
        <div
          className='progress-inner'
          ref={progressBar}
          onClick={progressClick}

        >
          <div className='progress-flex'>
            <div className='progress-btn-wrapper' ref={progress} />
            <div
              className='progress-btn'
              onMouseDown={btnMouseDown}
              ref={btnWrapper}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicProgress;
