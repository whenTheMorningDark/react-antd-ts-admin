import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import global from './global';

const reducer = combineReducers({
  global,
});

export const store = configureStore({
  reducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;