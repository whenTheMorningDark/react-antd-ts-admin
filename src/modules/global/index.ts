
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const namespace = 'global';
export interface IGlobalState {
  layout: string, // 布局方式
  isFullPage: boolean, // 当前是否是全屏页面
  isToggle: boolean, // 侧边栏收起展开
  openKeys: string[]
}

const initialState: IGlobalState = {
  layout: '1',
  isFullPage: false,
  isToggle: false,
  openKeys: []
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
    onOpenChange: (state, action) => {
      const keys = action.payload;
      if (keys.length > state.openKeys.length) {
        // setOpenKeys(keys);
        state.openKeys = keys;
      } else {
        // setOpenKeys(keys.filter((key) => openKeys.indexOf(key) !== -1));
        const t = keys.filter((key: string) => state.openKeys.indexOf(key) !== -1);
        state.openKeys = t;
      }
    }
  },
  extraReducers: () => { },
});

export const selectGlobal = (state: RootState) => state.global;

export const { switchFullPage, switchToggle, onOpenChange } = globalSlice.actions;

export default globalSlice.reducer;
