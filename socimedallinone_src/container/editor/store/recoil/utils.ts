import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {getRecoilKey} from '../helper';

//Is Editor Loaded
const loaded = atom({
  key: getRecoilKey('ELOADED'),
  default: false,
});

const useEditorLoaded = () => {
  return useRecoilState(loaded);
};

//Editor Type
const videoType = atom({
  key: getRecoilKey('ETYPE'),
  default: false,
});

const useSetEditorType = () => {
  const setVideoEditorType = useSetRecoilState(videoType);
  return {setVideoEditorType};
};

const useEditorType = () => {
  const isVideoEditor = useRecoilValue(videoType);
  return {isVideoEditor};
};

//Is Downloading
const downloading = atom({
  key: getRecoilKey('DOWNLOADING'),
  default: false,
});

const useDownloadState = () => {
  return useRecoilState(downloading);
};

export {
  //Editor type
  useSetEditorType,
  useEditorType,
  //Editor loaded
  useEditorLoaded,
  //Editor downloading
  useDownloadState,
};
