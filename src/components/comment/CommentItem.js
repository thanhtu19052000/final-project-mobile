import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { timeDifference } from "../../utils/timeDifference";

const CommentItem = ({ avatar_url, username, description, timePost }) => {
  const [timeComment, setTimeComment] = useState(0);

  useEffect(() => {
    // const idInterval = setInterval(() => {
    if (typeof timePost != "string") {
      const newTimeComment = timeDifference(timePost?.toMillis());
      setTimeComment(newTimeComment);
    } else {
      setTimeComment(timePost);
    }
    // }, 180000);

    // return () => clearInterval(idInterval);
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 8,
      }}
    >
      <View style={{ justifyContent: "flex-start" }}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatar_url,
          }}
        />
      </View>
      <View
        style={{
          // alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          {username}
          <Text style={{ color: "white", fontWeight: "400" }}>
            {"  "}
            {description}
          </Text>
        </Text>
        <Text
          style={{
            color: "#808080",
            fontSize: 10,
            marginTop: 4,
          }}
        >
          {timeComment}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "white",
    flex: 1,
    borderWidth: 0.6,
    borderTopColor: "#707070",
    // paddingTop: PlatformColor.OS === "android" ? StatusBar.currentHeight : 0,
  },
  avatar: {
    height: 38,
    width: 38,
    borderRadius: 19,
  },
});
