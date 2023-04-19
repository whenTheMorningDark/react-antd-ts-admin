
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { DrawerProps } from 'antd';
import { RootState } from '../store';

const namespace = 'draw';
interface myProps extends DrawerProps {
  open?: boolean
  title?: string
  width?: string | number
  children?: string,
  propsData?: Record<string, any>,
}
interface drawState {
  drawProps: myProps,
}

const initialState: drawState = {
  drawProps: {
    open: false,
  },

};

// 创建带有命名空间的reducer
const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setDrawProps: (state, action: PayloadAction<myProps>) => {

      if (!action.payload.onClose) {
        state.drawProps.onClose = () => {
          console.log('wwwwa');
          state.drawProps.open = false;
        };
        console.log(state.drawProps, 'w');
      }
      (state.drawProps as any) = action.payload;
      console.log(state.drawProps, 'state.drawProps');
    },
  },
});

export const selectGlobal = (state: RootState) => state.draw;

export const { setDrawProps } = globalSlice.actions;

export default globalSlice.reducer;
