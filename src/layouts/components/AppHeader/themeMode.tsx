import React, { useState } from 'react';
import './themeMode.less';
import classnames from 'classnames';
import { switchTheme } from 'modules/global';
import { useAppDispatch } from 'modules/store';

interface Iprops {
  onChange?: (value?: any) => void;
}
export interface listProps {
  backgroundColor: string,
  desc: string,
  index: number,
  type: string
}

const themeList: listProps[] = [
  {
    backgroundColor: '#ddd',
    desc: '明亮',
    index: 1,
    type: 'light'
  },
  {
    backgroundColor: 'rgba(0,0,0,0.9)',
    desc: '暗黑',
    index: 2,
    type: 'dark'
  }
];

const themeMode = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const dispatch = useAppDispatch();
  const handleClick = (v: listProps) => {
    const { index } = v;
    setActiveIndex(index);
    dispatch(switchTheme(v.type));
  };
  return (
    <div className='themeMode'>
      <div className='title'>
        主题模式
      </div>
      <div className='themeMode-list'>
        {
          themeList.map(v => (
            <div key={v.index}
              className={classnames('themeMode-list-item', {
                active: activeIndex === v.index
              })}
              onClick={() => handleClick(v)}
            >
              <div className='bgColor' style={{ backgroundColor: v.backgroundColor }}></div>
              <span className='desc'>{v.desc}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default themeMode;