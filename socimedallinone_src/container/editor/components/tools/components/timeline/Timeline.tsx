import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Icon, Loader} from '../../../../../../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {colors} from '../../../../../../theme';
import ToolTitle from '../common/title/ToolTitle';
import {ReduxState} from '../../../../store';
import {usePlayer, useFrames} from '../../../../hooks';

const Timeline = () => {
  const {frames, isFrameLoading} = useFrames();
  const {changePosition} = usePlayer();

  const flatListRef = useRef<FlatList>(null);
  const position = useSelector((state: ReduxState) => state.player.position);

  useEffect(() => {
    if (position && frames.length) {
      const frameIndex = Math.ceil(position / 1000);
      if (frameIndex <= frames.length) {
        flatListRef.current?.scrollToIndex({
          index: frameIndex - 1,
          animated: true,
        });
      }
    }
  }, [position, frames]);

  const onFramePress = (position: number) => {
    // changePosition(position * 1000);
  };

  const renderItem: ListRenderItem<string> = ({index, item}) => {
    const isCurrent = Math.ceil(position / 1000) === index;
    return (
      <TouchableOpacity onPress={() => onFramePress(index)}>
        <View style={styles.frameContainer}>
          <Text style={styles.frameLabel}>{index + 's'}</Text>
          <Image source={{uri: item}} style={[styles.frame]} />
          {isCurrent ? (
            <Icon
              name={'caret-up'}
              onPress={() => onFramePress(index)}
              size={14}
              family="Ionicons"
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  if (isFrameLoading) {
    return (
      <View>
        <ToolTitle>Timeline</ToolTitle>
        <View style={[styles.container, styles.loader]}>
          <Loader size={80} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ToolTitle>Timeline</ToolTitle>
      <FlatList
        data={frames}
        ref={flatListRef}
        keyExtractor={(item, index) => item}
        renderItem={renderItem}
        horizontal
        // get
      />
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({
  container: {
    // height: 150,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    height: 50,
    width: 50,
  },
  frameContainer: {
    height: 80,
    alignItems: 'center',
    // justifyContent: "center",
  },
  frameLabel: {
    color: colors.white,
    paddingBottom: 2,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    paddingBottom: 10,
  },
});
