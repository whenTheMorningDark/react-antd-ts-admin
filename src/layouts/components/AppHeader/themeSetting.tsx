import React from 'react';
import ThemeMode from './themeMode';

export interface Iprops {
  id: string
}
const ThemeSetting = (props: Iprops) => {
  console.log('1');
  return (
    <div className='themeSetting'>
      <ThemeMode />
    </div>
  );
};
export default ThemeSetting;