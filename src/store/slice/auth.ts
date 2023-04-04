import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { myApi } from '../action'; // 将一个异步的操作入进来
import menuSlice from 'src/store/slice/menu';
import { RootState } from '../index';
// 引入类型
function stop(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('张三啊啊啊');
    }, ms);
  });
}

export const incrementAsync = createAsyncThunk('counter/fetchCount', async () => {
  const response = await stop(1000);
  return response;
});

// 声明状态进行接收
interface authSate {
  name: string;
}

const initialState: authSate = {
  name: '',
};

export const authSlice = createSlice({
  name: 'auth', // 类似于命名空间，（取个名字）
  initialState, // 引用你写的状态
  // reducers 里面包裹的是同步的方法
  reducers: {
    setTabName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, () => {
        console.log('pending');
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        console.log(action, 'actionactionaction');

        state.name = action.payload;
        console.log(menuSlice, 'toggleMenu');
        // toggleMenu(true);
      });
  },
});

export const { setTabName } = authSlice.actions;
export const auth = (state: RootState) => state.auth;
export default authSlice.reducer;
