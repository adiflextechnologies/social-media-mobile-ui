import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

import {colors} from '../../theme';

const Icon = ({
  name,
  size,
  color = colors.white,
  onPress = () => {},
  family = 'FontAwesome5',
  style = {},
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <IconComponent
        onPress={onPress}
        family={family}
        name={name}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

const IconComponent = ({family, name, size, color, onPress}) => {
  switch (family) {
    case 'FontAwesome5':
      return (
        <FontAwesome5 name={name} size={size} color={color} onPress={onPress} />
      );
    case 'Fontisto':
      return (
        <Fontisto name={name} size={size} color={color} onPress={onPress} />
      );
    case 'Ionicons':
      return (
        <Ionicons name={name} size={size} color={color} onPress={onPress} />
      );
    default:
      return null;
  }
};

export default Icon;

const styles = StyleSheet.create({});
