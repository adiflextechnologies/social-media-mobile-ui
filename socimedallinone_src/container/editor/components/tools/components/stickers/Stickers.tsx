import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ToolTitle from "../common/title/ToolTitle";
import { Image } from "expo-image";
import StaticStickers from "./static";

const Stickers = () => {
  return (
    <View>
      <ToolTitle>Stickers</ToolTitle>
      <View style={styles.container}>
        {StaticStickers.birthday.map((item) => {
          return <Sticker key={item} source={item} />;
        })}
      </View>
    </View>
  );
};

type StickerProps = {
  source: any;
};

const Sticker: React.FC<StickerProps> = ({ source }) => {
  return (
    <View style={styles.stickerContainer}>
      <Image style={styles.sticker} source={source} />
    </View>
  );
};

export default Stickers;

const styles = StyleSheet.create({
  sticker: {
    height: 58,
    width: 58,
  },
  container: {
    flexDirection: 'row',
  },
  stickerContainer: {
    marginHorizontal: 10
  }
});
