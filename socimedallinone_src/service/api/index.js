import {AI_BASE_URL, BlueBerryHeader} from '../config';
import getAuth from './auth';
import createAxios from './axios';
import getHome from './home';
import getImgProcess from './imgprocess';
import getPosts from './posts';

const instance = createAxios();
const blueberryai = createAxios(AI_BASE_URL, BlueBerryHeader);

const api = {
  auth: getAuth(instance),
  home: getHome(instance),
  posts: getPosts(instance),
  ai: getImgProcess(blueberryai),
};

export default api;
