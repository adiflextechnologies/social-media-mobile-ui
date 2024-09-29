import {ImageStyle} from 'expo-image';
import {TextStyle, ViewStyle} from 'react-native';

type Template = {
  id: string;
  images: string;
};

type ImageSource = {
  data: string[];
  index: number;
  initialIndex: number;
};

type OverlayType = 'image' | 'text' | 'video';

type Overlay = {
  id: string;
  source: string;
  type: OverlayType;
};

type OverlayStyle = {
  style: {
    width: number;
    height: number;
    fontColor: string;
  };
  position: {
    x: number;
    y: number;
  };
};

export type {Template, ImageSource, Overlay, OverlayType, OverlayStyle};
