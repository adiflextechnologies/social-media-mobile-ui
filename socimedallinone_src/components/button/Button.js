import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../theme';

const Button = ({
  onPress = () => {},
  isLoading = false,
  title = '',
  isMedium = false,
  isOutlined = false,
  containerStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={[
        styles.button,
        isMedium && {
          paddingVertical: 10,
          paddingHorizontal: 20,
        },
        isOutlined && {
          backgroundColor: colors.accent,
        },
        containerStyle,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={'#fff'} size={24} />
      ) : (
        <Text
          style={[
            styles.title,
            isOutlined && {
              color: colors.active,
            },
            isMedium && {fontSize: 16},
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    // width: '100%',
    // height: 55,
    backgroundColor: colors.active,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },
});
