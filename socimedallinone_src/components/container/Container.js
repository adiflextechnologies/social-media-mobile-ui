import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../theme/color';
import Loader from '../loader/Loader';

const Container = ({
  children,
  style = {},
  renderHeader,
  isLoading = false,
  containerStyle = {},
  msg = '',
}) => {
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.secoundry,
        }}>
        <Loader size={120} color={colors.white} />
        <Text style={styles.pleaseWait}>{msg || 'Please wait...'}</Text>
      </View>
    );
  }
  return (
    <View style={styles.parentContainer}>
      <SafeAreaView style={[styles.safeviewContaier, containerStyle]}>
        {renderHeader ? renderHeader() : null}
        <View style={[styles.container, style]}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.secoundry,
    flex: 1,
    // backgroundColor: '#E5E4E2'
  },
  safeviewContaier: {
    flex: 1,
  },
  parentContainer: {
    flex: 1,
    backgroundColor: colors.accent,
  },
  pleaseWait: {
    color: colors.white,
    fontSize: 16,
  },
});
