// 在这个文件里你可以声明状态来为将来需要接收的状态做准备（状态在此文件中汇总）
import { combineReducers } from '@reduxjs/toolkit';
import menu from './slice/menu'; // 引入之前写好的slice（读取状态）
import tab from './slice/tab';
import auth from './slice/auth';
import draw from './slice/draw';
import music from './slice/music';
import global from './slice/global';
// 引入之前写好的slice（读取状态）
const reducers = {
  // 声明状态在此处
  menu,
  tab,
  auth,
  draw,
  music,
  global,
};
const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
