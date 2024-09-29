import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import ToolTitle from "../common/title/ToolTitle";
import { colors } from "../../../../../../theme";
import { STATIC_FORMATS } from "../../../../utils/constants/formats";
import { useDispatch, useSelector } from "react-redux";
import { utilsActions } from "../../../../store/slice/utils";
import { ReduxState } from "../../../../store";
import { FormatType } from "../../../../utils/types/types";

const Format = () => {
  const activeFormat = useSelector((state: ReduxState) => state.utils.format);

  return (
    <View>
      <ToolTitle>Format</ToolTitle>
      <View style={styles.container}>
        {STATIC_FORMATS.map((item) => {
          return (
            <RatioFrame
              key={item.label}
              isActive={activeFormat.value === item.value}
              item={item}
            />
          );
        })}
      </View>
    </View>
  );
};

type FrameType = {
  item: FormatType
  isActive: boolean
};

const RatioFrame: React.FC<FrameType> = ({ item, isActive }) => {
  const dispatch = useDispatch<any>()

  const onPress = () => {
    dispatch(utilsActions.setActiveFormat(item))
  }

  return (
    <View style={styles.frameContainer}>
      <TouchableOpacity onPress={onPress} style={getFrameStyle(item.width / item.height, isActive)} />
      <View>
        <Text style={styles.label}>{item.label}</Text>
      </View>
    </View>
  );
};

const getFrameStyle = (cal: number, isActive: boolean): ViewStyle => {
  return {
    height: 60,
    width: 60 * cal,
    borderWidth: 2,
    borderColor: isActive ? colors.active : colors.primary,
    borderRadius: 2,
    backgroundColor: colors.secoundry
  };
};

export default Format;

const styles = StyleSheet.create({
  frameContainer: {
    height: 70,
    minWidth: 70,
    marginEnd: 10,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
  },
  label: {
    color: colors.white,
    marginTop: 5,
  },
});
