import React from 'react';
import './settingDetail.less';
import { switchColor } from 'src/store/slice/global';
import { useAppDispatch } from 'src/store/hook';

function SettingDetail() {
  const diyColor = ['#0052d9', '#0594fa', '#00a870', '#ebb105', '#ed7b2f', '#e34d59', '#ed49b4', '#834ec2'];
  const dispatch = useAppDispatch();
  const changeColor = (color: string) => {
    dispatch(switchColor(color));
  };
  return (
    <div className='settingDetawil'>
      <div className='setting-title'>
        主题色
      </div>
      <div className='setting-diy-color'>
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
