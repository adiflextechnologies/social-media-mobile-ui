import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useSession} from '../../hook/useSession';
import {colors} from '../../theme';

const AppHeader = ({
  navigation = {},
  isBack = false,
  title,
  isTabs = false,
}) => {
  return (
    <View style={styles.container}>
      {isBack ? (
        <MaterialCommunityIcons
          onPress={navigation.goBack}
          color={colors.white}
          name="arrow-left"
          size={26}
        />
      ) : null}
      {isTabs ? (
        <MaterialCommunityIcons
          onPress={navigation.toggleDrawer}
          color={colors.white}
          name="menu"
          size={26}
        />
      ) : null}
      <Text style={styles.title}>{isTabs ? '' : title}</Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.accent,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    paddingStart: 10,
    color: colors.white,
  },
});
