import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { myApi } from '../action'; // 将一个异步的操作入进来
import { RootState } from '../index'; // 引入类型

// 声明状态进行接收
interface menuState {
  toggle: boolean;
  activeMenu: string;
  openKeys: string[];
}

const initialState: menuState = {
  toggle: false,
  activeMenu: '',
  openKeys: [],
};

export const menuSlice = createSlice({
  name: 'menu', // 类似于命名空间，（取个名字）
  initialState, // 引用你写的状态
  // reducers 里面包裹的是同步的方法
  reducers: {
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.toggle = action.payload;
    },
    setOpenKeys: (state, action: PayloadAction<string[]>) => {
      state.openKeys = action.payload;
    },
  },
});

export const { toggleMenu, setOpenKeys } = menuSlice.actions;
export const student = (state: RootState) => state.menu;
export default menuSlice.reducer;
