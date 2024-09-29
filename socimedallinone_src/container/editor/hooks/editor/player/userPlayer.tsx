import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useContext} from 'react';
import {
  AVPlaybackSource,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  Video,
} from 'expo-av';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from '../../../store';
import {generateFrames} from '../../../utils/helper/FFmegkitHelper';
import {playerActions} from '../../../store/slice/player';

type PlayerProps = {
  ref: any;
  source: AVPlaybackSource;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  changePosition: (position: number) => void;
};

const PlayerContext = React.createContext<PlayerProps>({} as any);

const PlayerProvider: React.FC<any> = ({children}) => {
  const playerRef = useRef<Video>(null);
  const dispatch = useDispatch<any>();
  const {isPlaying, isReplay} = usePlayerStatus();
  const videoUri = useSelector((s: ReduxState) => s.editor.videoSource);
  // const [source, setSource] = useState<AVPlaybackSource>(
  //   require("../../../../../static/video/StaticVideo.mp4")
  // );

  const play = () => {
    if (isReplay) {
      dispatch(playerActions.resetReplay());
      playerRef.current?.replayAsync();
    } else {
      playerRef.current?.playAsync();
    }
  };

  const pause = () => {
    playerRef.current?.pauseAsync();
  };

  const changePosition = async (position: number) => {
    if (playerRef.current) {
      dispatch(playerActions.resetReplay());
      await playerRef.current?.setPositionAsync(position);
    }
  };

  const toggle = () => {
    console.log('toggle ===> ');

    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setOnPlaybackStatusUpdate(status =>
        dispatch(
          playerActions.onPlaybackStatusUpdate(
            status as AVPlaybackStatusSuccess,
          ),
        ),
      );
    }
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        ref: playerRef,
        source: {
          uri: videoUri,
        },
        play,
        pause,
        toggle,
        changePosition,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayerStatus = () => {
  const isReplay = useSelector((state: ReduxState) => state.player.isReplay);
  const isPlaying = useSelector((state: ReduxState) => state.player.isPlaying);

  return {
    isPlaying,
    isReplay,
  };
};

const useFrames = () => {
  const [isFrameLoading, setFrameLoading] = useState(true);
  const [frames, setFrames] = useState<string[]>([]);
  const dispatch = useDispatch();
  const duration = useSelector((state: ReduxState) => state.player.duration);
  const videoUri = useSelector((s: ReduxState) => s.editor.videoSource);

  useEffect(() => {
    if (duration) {
      getFrames();
    }
  }, [duration]);

  const getFrames = async () => {
    const {frames, isSuccess} = await generateFrames(duration, videoUri);
    setFrames(frames);
    setFrameLoading(false);
  };

  return {
    frames,
    isFrameLoading,
  };
};

const usePlayer = () => useContext(PlayerContext);

export {PlayerProvider, usePlayerStatus, useFrames};

export default usePlayer;
