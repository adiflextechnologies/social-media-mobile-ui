import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ActionSheet from '../actionSheet/ActionSheet';
import {colors} from '../../theme';
import Button from '../button/Button';
import {useSession} from '../../hook/useSession';

const LoginPopup = ({isVisible, onClose}) => {
  const {logoutUser} = useSession();

  return (
    <ActionSheet onClose={onClose} isVisible={isVisible}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          You need to a login to use editor feature
        </Text>
      </View>
      <View style={styles.content}>
        <Button title={'Login'} onPress={logoutUser} isMedium />
        <Button title={'Cancel'} onPress={onClose} isOutlined isMedium />
      </View>
    </ActionSheet>
  );
};

export default LoginPopup;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.secoundry,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  header: {
    color: colors.whitesmoke,
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    justifyContent: 'space-between',
  },
});
