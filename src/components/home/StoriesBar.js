import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import StoryItem from "./StoryItem";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const StoriesBar = ({ usersData }) => {
  return (
    <View style={styles.container} fullWidth={true}>
      <FlatList
        horizontal={true}
        data={usersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StoryItem avatar_url={item.avatar_url} username={item.username} />
        )}
      />
    </View>
  );
};

export default StoriesBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "white",
    height: 105,
    borderWidth: 0.25,
    borderBottomColor: "#fffcfc73",
    width: width,
  },
});
