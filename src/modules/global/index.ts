
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { insertThemeStylesheet } from 'utils/theme';
import { RootState } from '../store';

const namespace = 'global';
export interface IGlobalState {
  layout: string, // 布局方式
  isFullPage: boolean, // 当前是否是全屏页面
  isToggle: boolean, // 侧边栏收起展开
  themeColor: string,
  theme: 'dark' | 'light'
}

const initialState: IGlobalState = {
  layout: '1',
  isFullPage: false,
  isToggle: false,
  themeColor: '#1677ff',
  theme: 'light'
};

// 创建带有命名空间的reducer
const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    switchFullPage: (state, action) => {
      state.isFullPage = !!action?.payload;
    },
    switchToggle: (state, action) => {
      state.isToggle = action.payload;
    },
    switchThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    switchTheme: (state, action) => {
      state.theme = action.payload;
      document.documentElement.setAttribute('theme-mode', state.theme);
      insertThemeStylesheet('red', {}, state.theme);
    }
  },

});

export const selectGlobal = (state: RootState) => state.global;

export const { switchFullPage, switchToggle, switchTheme, switchThemeColor } = globalSlice.actions;

export default globalSlice.reducer;
