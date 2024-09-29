import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../../../../theme";
import { Icon } from "../../../../../../../components";
import { useDispatch } from "react-redux";
import { utilsActions } from "../../../../../store/slice/utils";

type IProps = {
  children: React.ReactNode;
};

const ToolTitle: React.FC<IProps> = ({ children }) => {
  const dispatch = useDispatch<any>()

  const onPress = () => {
    dispatch(utilsActions.setActiveTool(''))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{children}</Text>
      {/* <Text style={styles.title}>Close</Text> */}
      <Icon
          name={'close-circle-outline'}
          onPress={onPress}
          family="Ionicons"
          size={24}
          style={styles.icon}
        />
    </View>
  );
};

export default ToolTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 10, 
  }
});
