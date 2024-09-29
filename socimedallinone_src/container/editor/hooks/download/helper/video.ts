import {getStore} from '../../../store';
import useTerminal from '../../terminal/useTerminal';

const generateVideo = async () => {
  //State from redux store
  const store = getStore();
  const videoUri = store.editor.videoSource;
  const template = store.utils.activeTemplate;
  const format = store.utils.format;

  //Required Hooks
  const {addTemplate, changeScale, initTerminal, addImage, addText, save} =
    useTerminal();

  await initTerminal(false, videoUri, 'mp4');

  //Adding template on base image
  if (template?.images) {
    await addTemplate(template?.images);
  }

  //Changing scale of base image
  await changeScale(format.height, format.width);

  //Save image to gallery
  await save();
};

export default generateVideo;
