import * as Facebook from "expo-facebook";
import React from "react";
import {
  Alert,
  Button,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firebase, { db } from "../../firebase/config";
import { addDocument, setDocument } from "../../firebase/services";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithPassword = async (email, password) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // const { displayName, email, photoURL, uid } = userCredential.user;
        // const username = removeVietnameseTones(displayName);
        // const newUserName = username.replace(" ", ".").toLowerCase();
        // const dataUser = {
        //   displayName: displayName,
        //   avatar_url: photoURL,
        //   email: email,
        //   descriptionUser: "",
        //   username: newUserName,
        // };
        console.log("login success");
        // setDocument("users", uid, dataUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Email or password wrong !");
        setEmail("");
        setPassword("");
        console.log("login with email fail", errorMessage);
      });
  };

  const loginFaceBook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "171413448445007",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        const credential = await firebase.auth.FacebookAuthProvider.credential(
          token
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((user) => {
            // All the details about user are in here returned from firebase
            const { isNewUser } = user.additionalUserInfo;

            if (isNewUser) {
              const { displayName, email, photoURL, uid } = user.user;
              const username = removeVietnameseTones(displayName);
              const newUserName = username.replace(" ", ".").toLowerCase();

              const dataUser = {
                displayName: displayName,
                avatar_url: photoURL,
                email: email,
                descriptionUser: "",
                username: newUserName,
              };
              setDocument("users", uid, dataUser);
            }
          })
          .catch((error) => {
            console.log("Error occurred ", error);
          });
      } else {
        // type === 'cancel'
        Alert.alert("Login Fail");
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={styles.wrapicon}>
              <Image
                style={styles.icon}
                source={require("../../res/images/loginicon.png")}
              />
            </View>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder={"Username or email"}
                placeholderTextColor="grey"
                value={email}
                onChangeText={(text) => setEmail(text)}
              ></TextInput>
              <TextInput
                style={styles.input}
                placeholder={"Password"}
                placeholderTextColor="grey"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              ></TextInput>
              <TouchableOpacity
                style={styles.button}
                onPress={() => loginWithPassword(email, password)}
              >
                <Text style={styles.text}>Log in</Text>
              </TouchableOpacity>
              <View style={styles.forgot}>
                <Text style={styles.forgotthin}>
                  If you don't have account?
                </Text>
                <Text style={styles.forgotbold}> Register</Text>
                <Text style={styles.forgotthin}> now.</Text>
              </View>
              <View style={styles.wrapor}>
                <View style={styles.line}></View>
                <Text style={styles.or}>OR</Text>
                <View style={styles.line}></View>
              </View>
              <TouchableOpacity
                style={styles.buttonface}
                onPress={() => loginFaceBook()}
              >
                <AntDesign name="facebook-square" size={24} color="white" />
                <Text style={styles.textface}>Login in with Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textface: {
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  buttonface: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  forgot: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  forgotthin: {
    color: "white",
  },
  forgotbold: {
    color: "white",
    fontWeight: "bold",
  },
  or: {
    color: "white",
    position: "relative",
    top: 9,
    marginHorizontal: 6,
  },
  line: {
    borderBottomWidth: 1,
    flex: 1,
    borderColor: "white",

    opacity: 0.5,
  },
  wrapor: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  form: {
    margin: 20,
  },
  button: {
    backgroundColor: "rgba(246, 242, 242, 0.28)",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginBottom: 20,
  },
  input: {
    borderRadius: 3,
    color: "white",
    height: 40,
    fontSize: 14,
    marginBottom: 20,
    paddingLeft: 13,
    backgroundColor: "rgba(246, 242, 242, 0.18)",
  },
  icon: {
    width: 300,
    height: 300,
  },
  wrapicon: {
    flexDirection: "row",
    height: 300,
    justifyContent: "center",
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
