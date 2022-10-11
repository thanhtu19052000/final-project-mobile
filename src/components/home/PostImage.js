import React, { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";
import { Animated, View, StyleSheet, ScrollView, Text } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const PostImage = ({ images }) => {
  const numItems = images.length;
  const BAR_SPACE = 3;
  const itemWidth = 6;
  const animVal = new Animated.Value(0);
  const [heighImage, setHeighImage] = useState(deviceWidth);

  useEffect(() => {
    if (numItems === 1) {
      setHeighImage(deviceWidth);
    }
    Image.getSize(images[0], (width, heigh) => {
      let newHeigh = (deviceWidth * heigh) / width;
      if (heigh > width) {
        newHeigh = deviceWidth;
      }
      if (heigh * 1.5 < width) {
        newHeigh = deviceWidth / 1.5;
      }
      setHeighImage(newHeigh);
    });
  }, []);

  let imageArray = [];
  let barArray = [];

  images.forEach((image, i) => {
    const thisImage = (
      <Image
        key={`image${i}`}
        source={{ uri: image }}
        style={{ width: deviceWidth, height: heighImage }}
      />
    );
    imageArray.push(thisImage);

    const scrollBarVal = animVal.interpolate({
      inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
      outputRange: [-itemWidth, itemWidth],
      extrapolate: "clamp",
    });

    const thisBar = (
      <View
        key={`bar${i}`}
        style={[
          styles.track,
          {
            width: itemWidth,
            marginLeft: i === 0 ? 0 : BAR_SPACE,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.bar,
            {
              width: itemWidth,
              transform: [{ translateX: scrollBarVal }],
            },
          ]}
        />
      </View>
    );
    barArray.push(thisBar);
  });

  return (
    <View style={styles.container} flex={1}>
      {images[1] ? (
        <View style={styles.container} flex={1}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: animVal } } }],
              { useNativeDriver: false }
            )}
          >
            {imageArray}
          </ScrollView>
          <View style={styles.barContainer}>{barArray}</View>
        </View>
      ) : (
        <View>
          <Image
            source={{ uri: images[0] }}
            style={{ width: deviceWidth, height: heighImage }}
          />
        </View>
      )}
    </View>
  );
};

export default PostImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  barContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: -20,
    flexDirection: "row",
  },
  track: {
    backgroundColor: "#7a7a7a",
    overflow: "hidden",
    height: 6,
    borderRadius: 3,
  },
  bar: {
    backgroundColor: "#5582ff",
    height: 6,
    position: "absolute",
    left: 0,
    top: 0,
  },
});
