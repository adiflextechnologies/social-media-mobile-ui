import React, { useMemo } from "react";
import RNCarousel from "react-native-reanimated-carousel";
import { Dimensions, Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "expo-image";

const Carousel = ({ posters }) => {
  const {width} = useWindowDimensions()

  const renderItems = ({ index, item }) => {
    return (
      <Image
        source={item.image_link}
        style={{
          width: width - 45,
          height: width / 2,
          borderRadius: 5,
        }}
        resizeMode="stretch"
      />
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <RNCarousel
        loop
        width={width - 40}
        height={width / 2}
        autoPlay={true}
        data={posters}
        scrollAnimationDuration={1000}
        style={{
          borderRadius: 5,
        }}
        renderItem={renderItems}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
