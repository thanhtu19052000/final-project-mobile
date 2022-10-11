import React from "react";
import {
  Button,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../slices/authSilce";

HeaderProfile.propTypes = {};

function HeaderProfile(props) {
  const { user } = props;

  return (
    <>
      <View style={styles.containerbody}>
        <LinearGradient colors={["#DE0046", "#F7A34B"]} style={styles.boder}>
          <Image style={styles.img} source={{ uri: user?.avatar_url }} />
        </LinearGradient>
        <View style={styles.arrowcount}>
          <Text style={styles.count}>0</Text>
          <Text style={styles.typecount}>Posts</Text>
        </View>
        <View style={styles.arrowcount}>
          <Text style={styles.count}>0</Text>
          <Text style={styles.typecount}>Followers</Text>
        </View>
        <View style={styles.arrowcount}>
          <Text style={styles.count}>0</Text>
          <Text style={styles.typecount}>Following</Text>
        </View>
      </View>
      <View style={styles.bodytext}>
        <Text style={styles.bodytextTitle}>{user?.displayName}</Text>
        <Text style={styles.bodytextDetails}>{user?.descriptionUser}</Text>
        <TouchableOpacity>
          <Text style={styles.bodytextLink}>Link goes here</Text>
        </TouchableOpacity>
      </View>
    </>
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

export default HeaderProfile;
