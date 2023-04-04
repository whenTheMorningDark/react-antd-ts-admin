import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { myApi } from '../action'; // 将一个异步的操作入进来
import type { DrawerProps } from 'antd';
import { RootState } from '../index'; // 引入类型
// 声明状态进行接收
interface myProps extends DrawerProps{
  open?:boolean
  title?:string
  width?:string | number
  children?:string,
  propsData?:Record<string, any>
}
interface drawState {
  drawProps:myProps
}

const initialState:drawState = {
  drawProps: {
    open: false,
  },
};

export const draw = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    setDrawProps: (state, action: PayloadAction<myProps>) => {
      (state.drawProps as any) = action.payload;
    },
  },
});

export const { setDrawProps } = draw.actions;
export const drawData = (state: RootState) => state.draw;
export default draw.reducer;
