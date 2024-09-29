import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../../theme';
import {useSelector} from 'react-redux';
import {ReduxState} from '../../store';
import VideoEditor from './video/VideoEditor';
import ImageEditor from './image/ImageEditor';
import {useEditorType} from '../../store/recoil/utils';

const Editor = () => {
  const {isVideoEditor} = useEditorType();

  return (
    <View style={styles.container}>
      {isVideoEditor ? <VideoEditor /> : <ImageEditor />}
    </View>
  );
};

export default Editor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secoundry,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
