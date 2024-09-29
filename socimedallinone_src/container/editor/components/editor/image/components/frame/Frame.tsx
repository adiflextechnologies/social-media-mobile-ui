import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'expo-image';
import {useDimensions, useTemplates} from '../../../../../hooks';

const Frame = () => {
  const {activeTemplate} = useTemplates();
  const {style} = useDimensions();

  if (!activeTemplate) return null;

  return (
    <View pointerEvents="none" style={[style, styles.container]}>
      <Image
        source={activeTemplate?.images}
        style={[style, styles.image]}
        contentFit="fill"
      />
    </View>
  );
};

export default Frame;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  image: {
    backgroundColor: 'transparent',
  },
});
