import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import RNActionSheet from 'react-native-actions-sheet';
import { colors } from '../../theme';


const ActionSheet = ({isVisible, children, onClose, backgroundInteractionEnabled = false}) => {
  const actionSheetRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [isVisible]);

  return (
    <RNActionSheet backgroundInteractionEnabled={backgroundInteractionEnabled} containerStyle={styles.container} onClose={onClose} ref={actionSheetRef}>
      <View style={styles.container}>{children}</View>
    </RNActionSheet>
  );
};

export default ActionSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secoundry,
    borderRadius: 5,
    // paddingVertical: 10,
    // paddingHorizontal: 10
  }
});
