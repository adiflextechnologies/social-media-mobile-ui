import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import storeTypes from '../types';
import type {ImageSource} from '../../../types/editor';

type IProps = {
  isVideoEditor: boolean;
  isSetupDone: boolean;
  videoSource: string;
  imageSource: ImageSource;
  isLoading: boolean;
};

const initialState: IProps = {
  isVideoEditor: false,
  isSetupDone: false,
  isLoading: true,
  videoSource: '',
  imageSource: {
    data: [],
    index: 0,
    initialIndex: 0,
  },
};

const editorSlice = createSlice({
  name: storeTypes.slice.editor,
  initialState,
  reducers: {
    setVideoSource: (state, action: PayloadAction<string>) => {
      state.videoSource = action.payload;
    },
    setImageSource: (state, action: PayloadAction<ImageSource>) => {
      state.imageSource = action.payload;
    },
    setVideoEditorType: (state, action: PayloadAction<boolean>) => {
      state.isVideoEditor = action.payload;
    },
    setImageActiveIndex: (state, action: PayloadAction<number>) => {
      state.imageSource.index = action.payload;
    },
    setEditorLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const editorActions = editorSlice.actions;
export default editorSlice.reducer;
