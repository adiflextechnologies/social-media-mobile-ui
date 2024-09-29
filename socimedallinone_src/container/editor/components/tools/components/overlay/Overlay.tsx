import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ToolTitle from "../common/title/ToolTitle";
import { Icon } from "../../../../../../components";
import { colors } from "../../../../../../theme";
import { MediaTypeOptions } from "expo-image-picker";
import { ActionItemType } from "../../../../utils/types/types";
import { ActionItem } from "../common";
import { useAddOverlay } from "../../../../hooks/tools";

const Overlay = () => {
  const { getMedia } = useAddOverlay();

  const onActionPress = (item: ActionItemType) => {
    getMedia(item.type, item.label != "Gallery");
  };

  return (
    <View>
      <ToolTitle>Overlay</ToolTitle>
      <View style={styles.actionsContainer}>
        {actions.map((item) => {
          return (
            <ActionItem onPress={onActionPress} key={item.label} item={item} />
          );
        })}
      </View>
    </View>
  );
};

const actions: ActionItemType[] = [
  {
    icon: "camera-outline",
    label: "Camera",
    type: MediaTypeOptions.Images,
  },
  {
    icon: "videocam-outline",
    label: "Video",
    type: MediaTypeOptions.Videos,
  },
  {
    icon: "images-outline",
    label: "Gallery",
    type: MediaTypeOptions.All,
  },
];

export default Overlay;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 10,
  },
});
