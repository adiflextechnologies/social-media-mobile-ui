import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../theme';
import Loader from '../loader/Loader';

const LoadingContent = () => {
  return (
    <View style={styles.container}>
      <Loader size={100} />
    </View>
  );
};

export default LoadingContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});
