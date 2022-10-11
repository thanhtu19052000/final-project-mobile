import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

const HeaderHome = ({ navigation, handleModalCreatePost }) => {
  return (
    <View style={styles.container} fullWidth={true}>
      <Image
        style={styles.logo}
        source={require("../../res/images/logo.png")}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.addIcon}
          onPress={() => handleModalCreatePost("open")}
        >
          <Image
            style={styles.iconAdd}
            source={require("../../res/images/addIcon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Message")}>
          <Image
            style={styles.icon}
            source={require("../../res/images/direct_message.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    height: 46,
    backgroundColor: "#000",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  logo: {
    height: 42,
    width: 120,
  },
  icon: {
    height: 18,
    width: 18,
  },
  iconAdd: {
    height: 14,
    width: 14,
  },
  addIcon: {
    borderColor: "white",
    borderWidth: 1.5,
    padding: 3,
    borderRadius: 6,
    marginRight: 24,
  },
  iconContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
  },
});
