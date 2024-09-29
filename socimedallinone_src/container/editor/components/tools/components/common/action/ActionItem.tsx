import { View, Text, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import { Icon } from "../../../../../../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../../../../../theme";
import { ActionItemType } from "../../../../../utils/types/types";


type ItemProps = PropsWithChildren<{
  item: ActionItemType;
  onPress: (item: ActionItemType) => void;
}>

const ActionItem: React.FC<ItemProps> = ({ item, onPress, children }) => {
  const onActionPress = () => {
    onPress(item);
  };

  return (
    <TouchableOpacity onPress={onActionPress} style={[styles.itemContainer]}>
      <View style={styles.icon}>
        {children ? children : <Icon
          name={item.icon}
          onPress={onPress}
          family="Ionicons"
          size={24}
          style={{}}
        />}
      </View>
      <Text numberOfLines={2} style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    marginEnd: 25,
  },
  label: {
    color: colors.white,
    fontSize: 12,
    width: 50,
    textAlign: 'center'
  },
  icon: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.white,
    borderWidth: 0.5,
    marginBottom: 5,
  },
});

export default ActionItem;
