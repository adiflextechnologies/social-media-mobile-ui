import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon, LottieIcon} from '../../../../components';
import {colors} from '../../../../theme';
import Download from './component/download/Download';

const Header = ({}) => {
  const navigation = useNavigation<any>();

  const onClosePress = () => {
    navigation.pop();
  };

  const onPreviewPress = async () => {};

  return (
    <View style={styles.headerContainer}>
      <View>
        <Icon onPress={onClosePress} name="times" size={20} />
      </View>
      <View style={styles.headerRightContainer}>
        <Download />
        <TouchableOpacity onPress={onPreviewPress} style={styles.doneContainer}>
          <Icon onPress={onPreviewPress} name="expand" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  done: {
    fontSize: 18,
    color: colors.active,
    fontWeight: '500',
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#353535',
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: colors.accent,
  },
  doneContainer: {
    marginStart: 40,
  },
});

export default Header;
