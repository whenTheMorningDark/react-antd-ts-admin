import React from 'react';
import './settingDetail.less';

const settingDetail = () => {
  console.log('settingDetail');
  const diyColor = [
    '#0F2C5D',
    '#ACD4FD',
    '#F7C5C8',
    '#ED759E',
    '#43A3FF',
    '#22B5C8',
    '#838AA3',
    '#4E61BF',
    '#B7BDFF',
  ];
  const changeColor = (color: string) => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `:root{
      --main-bg-color:${color}
    }`;
    document.head.append(styleSheet);
  };
  return (
    <div className='settingDetawil'>
      <div className='setting-title'>
        主题色
      </div>
      <div className='setting-diy-color'>
        {/* <div className='diy-item' /> */}
        {
          diyColor.map((v) => (
            <div
              key={v}
              className='diy-item'
              style={{ backgroundColor: v }}
              onClick={() => changeColor(v)}
            />
          ))
        }
      </div>

    </div>
  );
};

export default settingDetail;
