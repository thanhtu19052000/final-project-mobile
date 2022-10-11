import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import AppNavigator from "./src/routes/AppNavigator";
import MainStack from "./src/routes/main/MainStack";
import LoginScreen from "./src/screens/login/LoginScreen";
import store from "./store";
import { LogBox } from "react-native";
import HomeScreenDiary from "./srcDiaryMobile/HomeScreenDiary";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["AsyncStorage has been extracted"]);

export default function App() {
  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    Platform.OS === "android" && StatusBar.setBackgroundColor("black", true);
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
    // <HomeScreenDiary />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
