import React from "react";
import {
  Button,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../slices/authSilce";
import firebase from "../../firebase/config";

function Infro(props) {
  const { user, post, currentId, navigation } = props;

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("logout success"))
      .catch((err) => console.log(err));
  };

  const showConfirmLogout = (id) => {
    return Alert.alert("Are your sure?", "Are you sure you want logout?", [
      {
        text: "Yes",
        onPress: () => {
          logout();
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <View style={styles.containertop}>
      <TouchableOpacity style={styles.containerleft}>
        <Text style={styles.text}>{user?.username}</Text>
        <AntDesign
          style={styles.icondown}
          name="down"
          size={14}
          color="white"
        />
      </TouchableOpacity>
      <View style={styles.containerright}>
        <TouchableOpacity style={styles.addIcon}>
          <Image
            style={styles.iconAdd}
            source={require("../../res/images/addIcon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={showConfirmLogout}>
          <Image
            style={styles.icon}
            source={require("../../res/images/list3.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containertop: {
    marginLeft: 8,
    marginRight: 16,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 46,
    alignItems: "center",
  },
  containerbody: {
    marginLeft: 8,
    marginRight: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerleft: {
    flexDirection: "row",
  },
  containerright: {
    flexDirection: "row",
  },
  bodytext: {
    marginHorizontal: 8,
    marginVertical: 10,
  },
  icon: {
    width: 22,
    height: 22,
    marginLeft: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  icondown: {
    position: "relative",
    top: 6,
    marginLeft: 6,
  },
  img: {
    height: 86,
    width: 86,
    borderRadius: 86 / 2,
  },
  boder: {
    height: 91,
    width: 91,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 91 / 2,
    marginRight: 20,
  },

  count: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
  },
  typecount: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
  },
  bodytextTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bodytextDetails: {
    color: "white",
    fontSize: 14,
  },
  bodytextLink: {
    color: "#03d7fc",
    marginTop: 5,
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
  },
});

export default Infro;
