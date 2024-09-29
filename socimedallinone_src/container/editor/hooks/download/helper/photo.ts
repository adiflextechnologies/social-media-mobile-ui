import { getStore } from "../../../store";
import useTerminal from "../../terminal/useTerminal";
import { useFileSystem } from "../../utils";

const generateImage = async () => {
  //State from redux store
  const store = getStore();
  const { data: images, index } = store.editor.imageSource;
  const template = store.utils.activeTemplate;
  const format = store.utils.format;
  const overlays = store.utils.overlays;
  const overlayStyles = store.utils.overlayStyles;

  //Required Hooks
  const { addTemplate, changeScale, initTerminal, addImage, addText, save } =
    useTerminal();

  await initTerminal(true, images[index]);

  //Adding template on base image
  if (template?.images) {
    await addTemplate(template?.images);
  }

  //Changing scale of base image
  await changeScale(format.height, format.width);

  for (const overlay of overlays) {
    const { id, source, type } = overlay;
    if (type === "image") {
      await addImage(source, overlayStyles[id]);
    } else {
      // await addText(source, overlayStyles[id]);
    }
  }

  //Save image to gallery
  await save();
};

export default generateImage;
