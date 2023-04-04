import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { toggleMenu } from 'src/store/slice/menu';
import { useAppDispatch, useAppSelector } from 'src/store/hook';
import { useToggle } from 'src/hooks/useToggle';

function Toggle() {
  const menu = useAppSelector((state) => state.menu);
  const [state, { toggle }] = useToggle(menu.toggle);
  const dispatch = useAppDispatch();
  const handleToggle = () => {
    toggle();
    dispatch(toggleMenu(!state));
  };
  return (
    <div className='toggle' onClick={handleToggle}>
      {state ? <MenuFoldOutlined className='toggle-icon' /> : <MenuUnfoldOutlined className='toggle-icon' />}
    </div>
  );
}

export default Toggle;
