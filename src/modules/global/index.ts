
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const namespace = 'global';
export interface IGlobalState {
  layout: string, // 布局方式
  isFullPage: boolean, // 当前是否是全屏页面
  isToggle: boolean, // 侧边栏收起展开
}

const initialState: IGlobalState = {
  layout: '1',
  isFullPage: false,
  isToggle: false,
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
  },

});

export const selectGlobal = (state: RootState) => state.global;

export const { switchFullPage, switchToggle } = globalSlice.actions;

export default globalSlice.reducer;
