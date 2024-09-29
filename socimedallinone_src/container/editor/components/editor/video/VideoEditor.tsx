import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { VideoPlayer } from "../../../lib";
import { PlayerProvider } from "../../../hooks";
import { Frame } from "../image/components";

const VideoEditor = () => {
  return (
    <PlayerProvider>
      <VideoPlayer>
        <Frame />
      </VideoPlayer>
    </PlayerProvider>
  );
};

export default VideoEditor;

const styles = StyleSheet.create({});
