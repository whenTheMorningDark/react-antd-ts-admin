
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const namespace = 'global';
export interface IGlobalState {
  layout: string,
  isFullPage: boolean
}

const initialState: IGlobalState = {
  layout: '1',
  isFullPage: false,
};

// 创建带有命名空间的reducer
const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    switchFullPage: (state, action) => {
      state.isFullPage = !!action?.payload;
    },
  },
  extraReducers: () => { },
});

export const selectGlobal = (state: RootState) => state.global;

export const { switchFullPage } = globalSlice.actions;

export default globalSlice.reducer;
