import React from 'react';
import ThemeMode, { listProps } from './themeMode';

export interface Iprops {
  id: string
}
const ThemeSetting = (props: Iprops) => {
  console.log('1');
  const switchTheme = (v: listProps) => {
    console.log(v);
  };
  return (
    <div className='themeSetting'>
      <ThemeMode onChange={(v) => switchTheme(v)} />
    </div>
  );
};
export default ThemeSetting;