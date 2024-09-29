import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {usePlayer, usePlayerStatus} from '../../../../hooks';
import {Icon} from '../../../../../../components';
import Slider from '../slider/Slider';

type IProps = {
  width: number;
};

const PlayerControls: React.FC<IProps> = ({width}) => {
  const {isPlaying} = usePlayerStatus();
  const {toggle, play} = usePlayer();

  return (
    <View style={[styles.container, {width: width - 60}]}>
      <Icon
        name={isPlaying ? 'pause' : 'play'}
        onPress={toggle}
        size={25}
        style={styles.icon}
      />
      <Slider />
    </View>
  );
};

export default PlayerControls;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    // backgroundColor: 'red',
    paddingHorizontal: 10,
  },
});
