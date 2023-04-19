import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import global from './global';
import draw from './draw';

const reducer = combineReducers({
  global,
  draw
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;