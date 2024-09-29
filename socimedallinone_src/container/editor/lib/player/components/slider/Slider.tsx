import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {Slider as ASlider, SliderThemeType} from 'react-native-awesome-slider';
import {colors} from '../../../../../../theme';
import {useSelector} from 'react-redux';
import {usePlayer} from '../../../../hooks';
import {ReduxState} from '../../../../store';

const THEME: SliderThemeType = {
  disableMinTrackTintColor: colors.white,
  maximumTrackTintColor: 'rgba(214, 214, 212, 0.3)',
  minimumTrackTintColor: colors.secoundry,
  bubbleBackgroundColor: colors.accent,
};

const Slider = () => {
  const {changePosition} = usePlayer();
  const duration = useSelector((state: ReduxState) => state.player.duration);
  const position = useSelector((state: ReduxState) => state.player.position);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(duration);

  useEffect(() => {
    progress.value = position / 1000;
  }, [position]);

  useEffect(() => {
    max.value = duration / 1000;
  }, [duration]);

  const onValueChange = (value: number) => {
    changePosition(value * 1000);
  };

  return (
    <View style={styles.container}>
      <ASlider
        theme={THEME}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    // marginStart: 10,
    flex: 1,
  },
});
