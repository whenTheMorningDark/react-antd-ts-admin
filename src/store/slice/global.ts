import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { myApi } from '../action'; // 将一个异步的操作入进来
import { getGenerateColor } from 'src/hooks/useColor';
import { RootState } from '../index';
// 引入类型
// eslint-disable-next-line no-shadow
export enum ETheme {
  light = 'light',
  dark = 'dark',
}
// 声明状态进行接收
interface menuState {
  theme: ETheme,
  color: string
}

const initialState: menuState = {
  theme: ETheme.light,
  color: '#0052d9',
};

export const globalSlice = createSlice({
  name: 'global', // 类似于命名空间，（取个名字）
  initialState, // 引用你写的状态
  // reducers 里面包裹的是同步的方法
  reducers: {
    switchColor: (state, action: PayloadAction<string>) => {
      const styleSheet = document.createElement('style');
      const colorResult = getGenerateColor(action.payload);
      styleSheet.textContent = `:root{
      --main-bg-color:${colorResult[0]};
      --td-color1:${colorResult[1]}
    }`;
      document.head.append(styleSheet);
    },
  },
});

export const { switchColor } = globalSlice.actions;
export const student = (state: RootState) => state.menu;
export default globalSlice.reducer;
