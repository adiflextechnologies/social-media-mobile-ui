import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AVPlaybackStatusSuccess } from "expo-av";
import storeTypes from "../types";

type PlayerProps = {
  duration: number;
  position: number;
  isReplay: boolean;
  isPlaying: boolean;
  isFrameGenerated: boolean
};

const initialState: PlayerProps = {
  duration: 0,
  position: 0,
  isPlaying: false,
  isReplay: false,
  isFrameGenerated: false
};

export const playerSlice = createSlice({
  name: storeTypes.slice.player,
  initialState,
  reducers: {
    onPlaybackStatusUpdate: (
      state,
      actions: PayloadAction<AVPlaybackStatusSuccess>
    ) => {
      const status = actions.payload;
      if (status.didJustFinish) {
        state.isReplay = true;
      }
      state.isPlaying = status.isPlaying;
      state.duration = status.durationMillis || 0;
      state.position = status.positionMillis || 0;
    },
    resetReplay: (state) => {
      state.isReplay = false;
    },
    setFrameGenerated: (state, actions: PayloadAction<boolean>) => {
      state.isFrameGenerated = actions.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const playerActions = playerSlice.actions;

export default playerSlice.reducer;
