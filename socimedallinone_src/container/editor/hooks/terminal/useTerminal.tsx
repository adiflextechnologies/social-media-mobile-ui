import {Image} from 'react-native';
import React from 'react';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import commands from './commands';
import {useFileSystem} from '../utils';
import {OverlayStyle} from '../../../types/editor';

const useTerminal = () => {
  let isImageEditor = false;
  const {getLocalUri, getDownloadedUri, saveToGallery, getExtension} =
    useFileSystem();
  let extension = '';
  let baseUri = '';

  const getOutputUri = (ext?: string) => {
    return getLocalUri(`SMAIO_${Math.random().toFixed(5)}.${ext || extension}`);
  };

  const initTerminal = async (isImage: boolean, uri: string, ext?: string) => {
    isImageEditor = isImage;
    extension = ext || getExtension(uri);
    if (isImage) {
      baseUri = await getDownloadedUri(uri, getOutputUri());
    } else {
      baseUri = uri;
    }
  };

  const execute = async (command: string) => {
    const outputUri = getOutputUri();
    const session = await FFmpegKit.execute(`${command} ${outputUri}`);
    const returnCode = await session.getReturnCode();
    if (ReturnCode.isSuccess(returnCode)) {
      baseUri = outputUri;
    }
    return ReturnCode.isSuccess(returnCode);
  };

  const addTemplate = async (templateUri: string) => {
    const localTemplateUri = await getDownloadedUri(
      templateUri,
      getOutputUri(getExtension(templateUri)),
    );
    const command = commands.addTemplate(baseUri, localTemplateUri);
    await execute(command);
    return;
  };

  const addImage = async (imgUri: string, style: OverlayStyle) => {
    const command = commands.addOverlayImage(baseUri, imgUri, style);
    await execute(command);
    return;
  };

  const addText = async (text: string, style: OverlayStyle) => {
    const command = commands.addOverlayText(baseUri, text, style);
    await execute(command);
    return;
  };

  const changeScale = async (height: number, width: number) => {
    const command = commands.changeScale(baseUri, height, width);
    await execute(command);
    return;
  };

  const save = async () => {
    await saveToGallery(baseUri);
  };

  return {
    addTemplate,
    changeScale,
    initTerminal,
    addText,
    addImage,
    save,
    baseUri,
  };
};

export default useTerminal;
