import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ToolsComp from "./components";
import { ReduxState } from "../../store";

type IProps = {};

const Tools: React.FC<IProps> = () => {
  const tool = useSelector((state: ReduxState) => state.utils.tool);

  if (!tool) {
    return null;
  }

  return (
    <View style={styles.container}>
      {React.createElement(ToolsComp[tool])}
    </View>
  );
};

export default Tools;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 140
  },
 
});
