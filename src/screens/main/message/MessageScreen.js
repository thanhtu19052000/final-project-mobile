import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "../../../firebase/config";

const MessageScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ backgroundColor: "black", flex: 1, justifyContent: "center" }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Coming soon
      </Text>
    </SafeAreaView>
  );
};

export default MessageScreen;
