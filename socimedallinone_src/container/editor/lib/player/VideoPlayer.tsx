import React, {PropsWithChildren, useState} from 'react';
import {Video, ResizeMode} from 'expo-av';
import {PlayerControls} from './components';
import {useRoute} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import {usePlayer, useDimensions} from '../../hooks';

type IProps = PropsWithChildren<{}>;

const VideoPlayer: React.FC<IProps> = React.memo(({children}) => {
  const {style, width} = useDimensions();
  const params = useRoute<any>().params;
  const {ref, source} = usePlayer();
  const [isPreview, setPreview] = useState(false);

  const toggleControl = () => {
    setPreview(c => !c);
  };

  return (
    <View style={style}>
      <Video
        ref={ref}
        source={source}
        resizeMode={ResizeMode.STRETCH}
        style={style}
        onLoad={() => {
          console.log('VideoPlayer ==> ');
        }}
      />
      {children}
      <TouchableOpacity
        onPress={toggleControl}
        style={{
          ...style,
          position: 'absolute',
          backgroundColor: 'transparent',
          height: style.height - 50,
        }}
      />
      {!isPreview ? <PlayerControls width={width} /> : null}
    </View>
  );
});

export default VideoPlayer;
