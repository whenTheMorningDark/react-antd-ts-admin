import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { tranNumber } from 'src/utils/common';
import { RootState } from '../index'; // 引入类型
import { fetchPostsAsync, getSongUrlAsync } from '../action/musicAction';

export interface playProps{
  songData:{
    id:string
  },
  songList:Array<songListProps>,
  detailsData:{
    algTags:string[]
    coverImgUrl:string
    description:string
    name:string
    creator:Record<string, any>
    createTime:string
    trackCount:number
    playCount:number
  },
  currentSong:currentProps
}
export interface songListProps {
  title:string,
  src:string,
  alName:string,
  arName:string,
  duration:string,
  mark:string | number,
  publish:string,
  id:string | number
}
export interface currentProps{
  url:string,
  duration: string,
  src: string,
  title: string,
  id:string,
  arName:string
  alName:string
}

type detailsDataProps = playProps['detailsData']
// 声明状态进行接收
const getDetailData = (data:any) => ({
  algTags: data.playlist.tags,
  coverImgUrl: data.playlist.coverImgUrl,
  description: data.playlist.description,
  name: data.playlist.name,
  creator: data.playlist.creator,
  createTime: data.playlist.createTime,
  trackCount: data.playlist.trackCount,
  playCount: data.playlist.playCount,
}) as detailsDataProps;

const getSongListData = (data:Array<songListProps>) => data.map((v:any) => {
  const json = {
    title: v.name,
    src: v.al.picUrl,
    alName: `专辑-${v.al.name}`,
    arName: v.ar.reduce((cur:any, next:any, index:number) => {
      cur += `${next.name}${index === v.ar.length - 1 ? '' : '/'}`;
      return cur;
    }, ''),
    duration: dayjs(v.dt).format('mm:ss'),
    mark: tranNumber(v.mark, 0),
    publish: dayjs(v.publishTime).format('YYYY-MM-DD'),
    id: v.id,
  };
  return json;
});

const getCurrentSongListData = (songList:songListProps[], data:any) => {
  let json:currentProps = {
    id: '',
    url: '',
    title: '',
    duration: '',
    src: '',
    arName: '',
    alName: '',
  };
  if (data.length === 0 || songList.length === 0) {
    return json;
  }
  const cSong = data.length === 1
    ? songList.find((v) => v.id === data[0].id) as songListProps
    : songList[0];
  json = {
    id: cSong.id as string,
    url: data[0].url,
    arName: cSong.arName,
    duration: cSong.duration,
    src: cSong.src,
    title: cSong.title,
    alName: cSong.alName,
  };
  return json;
};

export const getListDataSong = createAsyncThunk(
  'get/getListDataSong',
  async (id:string | number, { dispatch }) => {
    const res = await dispatch(fetchPostsAsync(id));
    const tracksList = getSongListData(res.payload.playlist.tracks);
    const songUrlData = await dispatch(getSongUrlAsync(tracksList[0].id));
    const currentSong = getCurrentSongListData(tracksList, songUrlData);
    return {
      tracksList,
      currentSong,
    };
  },
);

const initialState:playProps = {
  songData: {
    id: '',
  },
  songList: [],
  detailsData: {
    algTags: [],
    coverImgUrl: '',
    description: '',
    name: '',
    creator: {},
    createTime: '',
    trackCount: 0,
    playCount: 0,
  },
  currentSong: {
    url: '',
    duration: '',
    src: '',
    title: '',
    id: '',
    arName: '',
    alName: '',
  },
};

export const music = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSongData: (state, action: PayloadAction<playProps>) => {
      state.songData = { ...state.songData, ...action.payload.songData };
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getListDataSong.fulfilled, (state, action) => {
      const data = action.payload;
      const { tracksList, currentSong } = data;
      state.songList = tracksList;
      state.currentSong = currentSong;
    });
    builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      const data = action.payload;
      state.detailsData = getDetailData(data);
      const tracksList = getSongListData(action.payload.playlist.tracks);
      state.songList = tracksList;
    });
    builder.addCase(getSongUrlAsync.fulfilled, (state, action) => {
      if (action.payload.code === 200) {
        const { data } = action.payload;
        if (data.length === 1) {
          const json = getCurrentSongListData(state.songList, data);
          state.currentSong = { ...state.currentSong, ...json };
        }
      }
    });
  },
});

export const { setSongData } = music.actions;
export const musicData = (state: RootState) => state.music;
export default music.reducer;
