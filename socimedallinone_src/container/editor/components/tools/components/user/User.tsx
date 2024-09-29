import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import ToolTitle from "../common/title/ToolTitle";
import { useSession } from "../../../../../../hook/useSession";
import { ActionItem } from "../common";
import { Image } from "expo-image";

const Info = () => {
  const { user: userData }: any = useSession();

  const actions = useMemo(() => getActions(userData), [userData]);

  const onActionPress = () => {};

  return (
    <View>
      <ToolTitle>Your Info</ToolTitle>
      <View style={styles.actionsContainer}>
        {actions.map((item) => {
          if (item.type === "PHOTO") {
            return (
              <ActionItem key={item.label} item={item} onPress={onActionPress}>
                <Image
                  source={{ uri: userData.image_url }}
                  style={styles.profile}
                />
              </ActionItem>
            );
          }
          return (
            <ActionItem key={item.label} item={item} onPress={onActionPress} />
          );
        })}
      </View>
    </View>
  );
};

const getActions = (user: any) => {
  return [
    {
      icon: "happy-outline",
      label: user?.name,
      type: "NAME",
    },

    {
      icon: "call-outline",
      label: user?.phone,
      type: "PHONE",
    },
    {
      icon: "mail-outline",
      label: user?.email,
      type: "Email",
    },
    {
      icon: "happy-outline",
      label: "Profile",
      type: "PHOTO",
    },
  ];
};

export default Info;

const styles = StyleSheet.create({
  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  actionsContainer: {
    flexDirection: "row",
  },
});
