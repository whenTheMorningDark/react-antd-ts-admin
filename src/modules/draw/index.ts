
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { DrawerProps } from 'antd';
import { RootState } from '../store';




const namespace = 'draw';
interface myProps extends DrawerProps {
  propsData?: Record<string, any>,
}


const initialState: myProps = {
  propsData: {
  },
};
// const notWidened = <T extends string>(val: T[]) => val;
// const dialogType = notWidened([]);
// type diaologProps = typeof dialogType[number];
// 创建带有命名空间的reducer
const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setDialogShow: (state, action: PayloadAction<myProps>) => {
      const targetArr = Object.keys(action.payload);
      targetArr.forEach(v => {
        const keys = v as never;
        (state[keys]) = action.payload[keys];
      });
    },
  },
});

export const selectGlobal = (state: RootState) => state.draw;

export const { setDialogShow } = globalSlice.actions;

export default globalSlice.reducer;
