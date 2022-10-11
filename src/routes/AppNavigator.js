import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase, { db } from "../firebase/config";
import LoginScreen from "../screens/login/LoginScreen";
import { loginAction, logoutAction } from "../slices/authSilce";
import MainStack from "./main/MainStack";

const AppNavigator = () => {
  const currentId = useSelector((state) => state.auth.currentId);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscired = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        dispatch(loginAction(uid));
      } else {
        dispatch(logoutAction(null));
      }
    });
    return () => unsubscired();
  }, []);

  // oder by key
  // db.collection("users")
  //   .doc(uid)
  //   .get()
  //   .then((docRef) => {
  //     dispatch(loginAction(docRef.data()));
  //   })
  //   .catch((error) => {});

  return (
    <NavigationContainer>
      {currentId ? <MainStack /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
