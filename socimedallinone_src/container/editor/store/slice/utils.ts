import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import storeTypes from '../types';
import {Overlay, Template} from '../../../types/editor';
import {STATIC_FORMATS} from '../../utils/constants/formats';
import {FormatType} from '../../utils/types/types';

type IProps = {
  tool: any;
  templates: Template[];
  activeTemplate: Template | null;
  format: FormatType;
  overlays: Overlay[];
  activeOverlay: string | null;
  overlayStyles: any;
};

const initialState: IProps = {
  tool: '',
  templates: [],
  activeTemplate: null,
  format: STATIC_FORMATS[0],
  overlays: [],
  activeOverlay: null,
  overlayStyles: {},
};

const utilsSlice = createSlice({
  name: storeTypes.slice.utils,
  initialState,
  reducers: {
    setActiveTool(state, action) {
      if (state.tool === action.payload) {
        state.tool = '';
      } else {
        state.tool = action.payload;
      }
    },
    toogleTemplate(state, action: PayloadAction<Template>) {
      if (
        state.activeTemplate &&
        state.activeTemplate.id === action.payload.id
      ) {
        state.activeTemplate = null;
      } else {
        state.activeTemplate = action.payload;
      }
    },
    setActiveFormat(state, action: PayloadAction<FormatType>) {
      state.format = action.payload;
    },

    //Overlay
    addOverlay(state, action: PayloadAction<Overlay>) {
      const scale = action.payload.type === 'text' ? 50 : 100;
      state.overlays.push(action.payload);
      state.overlayStyles = {
        ...state.overlayStyles,
        [action.payload.id]: {
          style: {
            zIndex: 1000 + state.overlays.length,
            width: scale,
            height: scale,
          },
          position: {
            x: 0,
            y: 0,
          },
        },
      };
    },
    removeOverlay(state, action: PayloadAction<string>) {
      const index = state.overlays.findIndex(
        item => item.id === action.payload,
      );
      state.overlays.splice(index, 1);
      delete state.overlayStyles[action.payload];
    },
    toggleActiveOverlay(state, action: PayloadAction<string>) {
      if (state.activeOverlay === action.payload) {
        state.activeOverlay = null;
      } else {
        state.activeOverlay = action.payload;
      }
    },
    updateOverlayStyle(state, action: PayloadAction<{id: string; data: any}>) {
      state.overlayStyles = {
        ...state.overlayStyles,
        [action.payload.id]: {
          ...state.overlayStyles[action.payload.id],
          ...action.payload.data,
        },
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(
      storeTypes.async.frames.fulfilled,
      (state, action: PayloadAction<Template[]>) => {
        state.templates = action.payload;
      },
    );
  },
});

export const utilsActions = utilsSlice.actions;
export default utilsSlice.reducer;
