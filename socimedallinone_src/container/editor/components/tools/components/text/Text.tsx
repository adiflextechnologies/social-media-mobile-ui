import {
  StyleSheet,
  Text as RNText,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import ToolTitle from '../common/title/ToolTitle';
import {colors} from '../../../../../../theme';
import useKeyboard from '../../../../hooks/utils/useKeyboard';
import {useAddOverlay} from '../../../../hooks';

const {width} = Dimensions.get('window');

const Text = () => {
  const [text, setText] = useState('');
  const keyboard = useKeyboard();
  const {addOverlay} = useAddOverlay();

  const onAddPress = () => {
    addOverlay(text, 'text');
    setText('');
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          keyboard.isOpen && getActiveKeyboardStyle(keyboard.height),
        ]}>
        <ToolTitle>Text</ToolTitle>
        <View>
          <View style={[styles.inputContainer]}>
            <TextInput
              placeholder="Type here..."
              placeholderTextColor={colors.gray}
              style={styles.input}
              onChangeText={setText}
              value={text}
            />
            <TouchableOpacity
              onPress={onAddPress}
              style={styles.buttonContainer}>
              <RNText style={styles.button}>Add</RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const getActiveKeyboardStyle = (height: number): ViewStyle => {
  return {
    top: -height + 100,
    width: width,
    left: -10,
    padding: 10,
    borderRadius: 5,
  };
};

export default Text;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: colors.white,
  },
  inputContainer: {
    marginTop: 5,
  },
  container: {
    position: 'absolute',
    width: width - 20,
    // top: 30,
    // padding: 10,
    backgroundColor: colors.accent,
  },
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.active,
    borderRadius: 5,
  },
  button: {
    color: colors.white,
    fontSize: 16,
  },
});
