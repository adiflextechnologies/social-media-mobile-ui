import {FormatType} from '../types/types';

const FORMATS = {
  REELS: 'REELS',
  SQUARE: 'SQUARE',
  PORTRAIT: 'PORTRAIT',
  LANDSCAPE: 'LANDSCAPE',
};

const STATIC_FORMATS: FormatType[] = [
  {
    label: 'Story',
    width: 9,
    height: 16,
    value: FORMATS.REELS,
    cmd: '1080x1920',
    margin: 100,
    padding: 20,
  },
  {
    label: 'Square',
    width: 1,
    height: 1,
    value: FORMATS.SQUARE,
    cmd: '1080x1080',
    margin: 50,
    padding: 0,
  },
  {
    label: 'Posts',
    width: 4,
    height: 5,
    value: FORMATS.PORTRAIT,
    cmd: '1080x1350',
    margin: 50,
    padding: 0,
  },
  {
    label: 'Rectangle',
    width: 5,
    height: 4,
    value: FORMATS.LANDSCAPE,
    cmd: '1350x1080',
    margin: 50,
    padding: 0,
  },
];

export {FORMATS, STATIC_FORMATS};
