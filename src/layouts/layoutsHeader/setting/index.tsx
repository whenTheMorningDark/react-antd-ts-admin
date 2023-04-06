import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import './index.less';
import { useAppDispatch } from 'src/store/hook';
import { setDrawProps } from 'src/store/slice/draw';
import UserIcon from './userIcon';

function Setting() {
  const dispatch = useAppDispatch();
  const openSettingDetail = () => {
    dispatch(setDrawProps(
      {
        open: true,
        title: '设置详情',
        width: 458,
        children: 'settingDetail',
      },
    ));
  };

  return (
    <div className='setting'>
      <UserIcon />
      <SettingOutlined onClick={openSettingDetail} />
    </div>
  );
}

export default Setting;
