import React from 'react';

import ThemeMode, { listProps } from './themeMode';
import ThemeStyle from './ThemeStyle';

export interface Iprops {
  id: string
}
const ThemeSetting = (props: Iprops) => {
  console.log('1');

  return (
    <div className='themeSetting'>
      <ThemeStyle></ThemeStyle>
      <ThemeMode />
    </div>
  );
};
export default ThemeSetting;