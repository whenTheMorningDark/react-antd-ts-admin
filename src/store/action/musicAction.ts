import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMusicDetails, getSongUrl } from 'src/api/music';

/**
 * @description 获取专辑列表详情数据
 */
const fetchPostsAsync = createAsyncThunk(
  'get/detailList',
  async (id:string | number) => {
    const response = await getMusicDetails(id);
    return response;
  },
);

const getSongUrlAsync = createAsyncThunk(
  'get/getSongUrl',
  async (id:string) => {
    const response = await getSongUrl(id);
    return response;
  },
);

export {
  fetchPostsAsync,
  getSongUrlAsync,
};
