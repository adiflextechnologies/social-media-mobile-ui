import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { useDimensions, usePhoto } from "../../hooks";
import { Image } from "expo-image";
import { useDispatch } from "react-redux";
import { editorActions } from "../../store/slice/editor";

const { width: WIDTH } = Dimensions.get("window");

const CONFIG_THRESHOLD = {
  viewAreaCoveragePercentThreshold: 50,
};

const PhotoList: React.FC<any> = ({ children }) => {
  const { style } = useDimensions();
  const { data, initialIndex } = usePhoto();
  const dispatch = useDispatch<any>();
  const config = useRef(CONFIG_THRESHOLD).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      dispatch(editorActions.setImageActiveIndex(index));
    }
  }).current;

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <Image
          // onLoad={(e) => {}}
          style={style}
          contentFit="fill"
          source={{ uri: item }}
        />
      );
    },
    [style]
  );

  return (
    <View style={style}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          initialScrollIndex={initialIndex}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={config}
        />
        {children}
      </View>
    </View>
  );
};

export default PhotoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    width: WIDTH,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
