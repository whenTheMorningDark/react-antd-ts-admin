import React, { useState } from 'react';
import './themeMode.less';
import classnames from 'classnames';

interface Iprops {
  onChange?: (value?: any) => void;
}
export interface listProps {
  backgroundColor: string,
  desc: string,
  index: number
}

const themeList: listProps[] = [
  {
    backgroundColor: '#ddd',
    desc: '明亮',
    index: 1
  },
  {
    backgroundColor: 'rgba(0,0,0,0.9)',
    desc: '暗黑',
    index: 2
  }
];

const themeMode = (props: Iprops) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (v: listProps) => {
    const { index } = v;
    setActiveIndex(index);
    if (props.onChange) {
      props.onChange(v);
    }
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