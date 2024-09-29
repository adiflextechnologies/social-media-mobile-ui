import {useSelector} from 'react-redux';
import {getStore, type ReduxState as RS} from '../../store';
import {useFileSystem} from '../utils';
import useTerminal from '../terminal/useTerminal';
import generateImage from './helper/photo';
import generateVideo from './helper/video';
import {useDownloadState, useEditorType} from '../../store/recoil/utils';
import {useEffect} from 'react';

type IProps = () => {
  // startDownload: (callback: () => void) => void;
  // isDownloading: boolean;
};

const useDownload: IProps = () => {
  const {isVideoEditor} = useEditorType();
  const [isDownloading, setDownloading] = useDownloadState();

  useEffect(() => {
    if (isDownloading) {
      downloading();
    }
  }, [isDownloading]);

  const downloading = async () => {
    if (isVideoEditor) {
      await generateVideo();
    } else {
      await generateImage();
    }
    setDownloading(false);
  };

  return {};
};

export default useDownload;
