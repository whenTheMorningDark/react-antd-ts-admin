import React, { useState } from 'react';
import './themeMode.less';
import classnames from 'classnames';

const themeList = [
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

const themeMode = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index: number) => {
    setActiveIndex(index);
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
              onClick={() => handleClick(v.index)}
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