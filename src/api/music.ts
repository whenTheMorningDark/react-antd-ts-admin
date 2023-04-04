import { http } from 'src/utils/request';

const getBanner = () => http.get('/dj/banner');
const getPrsonalized = () => http.get('/personalized');
const getMusicDetails = (id:string | number) => http.get(`/playlist/detail?id=${id}`);

const getSongUrl = (id:string) => http.get(`/song/url?id=${id}`);

export {
  getBanner,
  getPrsonalized,
  getMusicDetails,
  getSongUrl,
};
