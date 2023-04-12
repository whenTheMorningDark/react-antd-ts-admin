import React from 'react';
// import 'Src/hooks/useColor';
// import { Color } from 'tvision-color';
import { getGenerateColor } from 'src/hooks/useColor';
import './settingDetail.less';

function SettingDetail() {
  const diyColor = ['#0052d9', '#0594fa', '#00a870', '#ebb105', '#ed7b2f', '#e34d59', '#ed49b4', '#834ec2'];
  const changeColor = (color: string) => {
    const styleSheet = document.createElement('style');
    // console.log(getGenerateColor(color), 'color');
    const colorResult = getGenerateColor(color);
    styleSheet.textContent = `:root{
      --main-bg-color:${colorResult[0]};
      --td-color1:${colorResult[1]}
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
}

export default SettingDetail;
