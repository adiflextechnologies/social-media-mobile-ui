import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../theme';

const NoData = ({label = 'No Found'}) => {
  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noData}>{label}</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    color: colors.white,
    marginTop: 100,
    fontSize: 16,
  },
});
