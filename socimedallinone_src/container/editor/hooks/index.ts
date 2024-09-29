import HooksProvider from "./HookProvider";
import useDownload from "./download/useDownload";
import PhotoProvider, { usePhoto } from "./editor/photo/usePhoto";
import usePlayer, {
  PlayerProvider,
  usePlayerStatus,
  useFrames,
} from "./editor/player/userPlayer";
import useEditor from "./editor/useEditor";
import useAddOverlay from "./tools/overlay/useAddOverlay";
import useTemplates from "./tools/templates/useTemplates";
import useDimensions from "./utils/useDimensions";
import useKeyboard from "./utils/useKeyboard";

export {
  PhotoProvider,
  PlayerProvider,
  usePlayer,
  useKeyboard,
  useDimensions,
  useAddOverlay,
  useTemplates,
  usePhoto,
  usePlayerStatus,
  useFrames,
  useEditor,
  useDownload,
};

export default HooksProvider;
