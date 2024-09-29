import {atom, useRecoilValue, useSetRecoilState} from 'recoil';
import {getRecoilKey} from '../helper';
import {Overlay, Template} from '../../../types/editor';

//Templates
const templatesState = atom<Template[]>({
  key: getRecoilKey('TEMPLATES'),
  default: [],
});

const useSetTemplates = () => {
  const setTemplates = useSetRecoilState(templatesState);
  return {setTemplates};
};

const useTemplates = () => {
  const templates = useRecoilValue(templatesState);
  return {templates};
};

//Active Templates
const activeTemplateState = atom<Template | null>({
  key: getRecoilKey('ATEMPLATE'),
  default: null,
});

const useSetActiveTemplate = () => {
  const setActiveTemplate = useSetRecoilState(activeTemplateState);
  return {setActiveTemplate};
};

const useActiveTemplate = () => {
  const template = useRecoilValue(activeTemplateState);
  return {template};
};

//Overlays
const overlaysState = atom<Overlay[]>({
  key: getRecoilKey('OVERLAYS'),
  default: [],
});

const useSetOverlays = () => {
  const setOverlay = useSetRecoilState(overlaysState);
  return {setOverlay};
};

const useOverlays = () => {
  const overlays = useRecoilValue(overlaysState);
  return {overlays};
};

//Active Overlay
const activeOverlayState = atom<string>({
  key: getRecoilKey('AOVERLAY'),
  default: '',
});

const useSetActiveOverlay = () => {
  const setActiveOverlay = useSetRecoilState(activeOverlayState);
  return {setActiveOverlay};
};

const useActiveOverlay = () => {
  const activeOverlay = useRecoilValue(activeOverlayState);
  return {activeOverlay};
};

export {
  //Templates
  useSetTemplates,
  useTemplates,
  useSetActiveTemplate,
  useActiveTemplate,
  //Overlays
  useSetOverlays,
  useOverlays,
  useSetActiveOverlay,
  useActiveOverlay,
};
