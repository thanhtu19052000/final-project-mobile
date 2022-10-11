import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import Line from "../../../components/profiletab/Line";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../../firebase/config";

const SettingProfileScreen = (props) => {
  const { handleCloseModal, user } = props;
  const { avatar_url, descriptionUser, displayName, email, username, id } =
    user;
  const [imageBase64, setImageBase64] = useState(avatar_url);
  const [name, setName] = useState(displayName);
  const [emaill, setEmail] = useState(email);
  const [nameuser, setNameuser] = useState(username);
  const [descrip, setDescrip] = useState(descriptionUser);

  const editUser = (id) => {
    id &&
      db.collection("users").doc(id).update({
        username: nameuser,
        displayName: name,
        email: emaill,
        descriptionUser: descrip,
        avatar_url: imageBase64,
      });
  };

  function handleChange(e) {
    setName(e);
  }
  function handleChangeemail(e) {
    setEmail(e);
  }
  function handleChangeusername(e) {
    setNameuser(e);
  }
  function handleChangedescrip(e) {
    setDescrip(e);
  }
  function handleClose() {
    handleCloseModal();
  }
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
        base64: true,
      });

      // console.log(base64);
      if (!result.cancelled) {
        const base64 = `data:image/png;base64,${result.base64}`;
        setImageBase64(base64);
      }
    } catch (err) {
      console.log("get base64 error", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.text} onPress={() => handleClose()}>
          Close
        </Text>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity
          onPress={() => {
            editUser(id);
            handleClose();
          }}
        >
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      </View>
      <Line />
      <View style={styles.infor}>
        <View style={styles.wrapAvt}>
          <TouchableOpacity style={styles.avt} onPress={pickImage}>
            <Image style={styles.img} source={{ uri: imageBase64 }} />
            <Text style={styles.textimg}>Change avatar</Text>
          </TouchableOpacity>
        </View>
        <Line></Line>
        <View style={styles.form}>
          <View style={styles.col}>
            <Text style={styles.label}>Name:</Text>
            <View style={styles.wrapinput}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(e) => handleChange(e)}
              />
              <Line></Line>
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>UerName:</Text>
            <View style={styles.wrapinput}>
              <TextInput
                style={styles.input}
                value={nameuser}
                onChangeText={(e) => handleChangeusername(e)}
              />
              <Line></Line>
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Email:</Text>
            <View style={styles.wrapinput}>
              <TextInput
                style={styles.input}
                value={emaill}
                onChangeText={(e) => handleChangeemail(e)}
              />
              <Line></Line>
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Description:</Text>
            <View style={styles.wrapinput}>
              <TextInput
                style={styles.input}
                value={descrip}
                onChangeText={(e) => handleChangedescrip(e)}
              />
              <Line></Line>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  line: {
    borderTopWidth: 1,
    borderColor: "#cccc",
  },
  label: {
    color: "white",
    position: "relative",
    top: 4,
    width: "25%",
  },
  form: {
    margin: 8,
  },
  input: {
    paddingLeft: 10,
    width: "100%",
    color: "white",
  },
  wrapinput: {
    width: "75%",
    height: 45,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  col: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapAvt: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    marginBottom: 30,
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  textimg: {
    color: "white",
    position: "absolute",
    width: 120,
    top: 85,
    left: -10,
    fontWeight: "600",
    color: "#1b76f2",
  },
  text: {
    color: "white",
    paddingHorizontal: 8,
    fontWeight: "500",
    marginTop: 12,
  },
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 12,
  },
  container1: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: Platform.OS === "ios" ? 40 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    height: 40,
    alignItems: "center",
  },
  boderbottom: {
    borderTopWidth: 1,
    borderColor: "#cccc",
    opacity: 0.3,
    marginTop: 9,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
export default SettingProfileScreen;
