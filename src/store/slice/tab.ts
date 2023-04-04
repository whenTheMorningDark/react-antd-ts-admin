import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { myApi } from '../action'; // 将一个异步的操作入进来

import { RootState } from '../index'; // 引入类型
// 声明状态进行接收
export interface tabProps {
  name?: string;
  path: string;
}
export interface tabState {
  tabList: tabProps[];
  activeKey: string;
}

const initialState: tabState = {
  tabList: [
    // { name: '首页', path: '/dashboard' },
    // { name: '流程', path: '/bussiness/flow' },
    // { name: '表单', path: '/bussiness/form' },
    // { name: '游戏专区', path: '/gameList' },
  ],
  activeKey: '',
};

export const tabSlice = createSlice({
  name: 'tab', // 类似于命名空间，（取个名字）
  initialState, // 引用你写的状态
  // reducers 里面包裹的是同步的方法
  reducers: {
    addTabList: (state, action: PayloadAction<tabProps>) => {
      const isHaveTabs = state.tabList.some((v) => v.path === action.payload.path);
      if (!isHaveTabs) {
        state.tabList.push(action.payload);
      }
    },
    delTabList: (state, action: PayloadAction<tabProps>) => {
      const index = state.tabList.findIndex((v) => v.path === action.payload.path);
      if (action.payload.path !== state.activeKey && index > -1) {
        // 如果点当前是没选中了该页签 就正常删除
        state.tabList.splice(index, 1);
      } else {
        // 如果点击的是当前的选中的页签
        const targetIndex = index === 0 ? index + 1 : index - 1;
        if (state.tabList[targetIndex]) {
          state.activeKey = state.tabList[targetIndex].path;
          state.tabList.splice(index, 1);
        }
      }
    },
    setTabActive: (state, action: PayloadAction<tabProps>) => {
      state.activeKey = action.payload.path;
    },
  },
});

export const { addTabList, delTabList, setTabActive } = tabSlice.actions;
export const tabs = (state: RootState) => state.tab;
export default tabSlice.reducer;
