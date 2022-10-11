import React, { useEffect, useState } from "react";
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
  Modal,
} from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../slices/authSilce";
import { AntDesign } from "@expo/vector-icons";
import HeaderProfile from "../../../components/profiletab/HeaderProfile";
import Infro from "../../../components/profiletab/Infro";
import Story from "../../../components/profiletab/Story";
import RenderImg from "../../../components/profiletab/RenderImg";
import SettingProfileScreen from "./SettingProfileScreen";

const ProfileScreen = ({ navigation }) => {
  const currentId = useSelector((state) => state.auth.currentId);
  const usersData = useSelector((state) => state.users);
  const postsData = useSelector((state) => state.posts);
  const [currentUser, setCurrentUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const currentUser = usersData.filter((user) => user.id === currentId);
    const newUser = currentUser[0];
    setCurrentUser(newUser);
  }, [usersData]);
  function handleCloseModal() {
    setModalVisible(!modalVisible);
  }


  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SettingProfileScreen
          handleCloseModal={handleCloseModal}
          user={currentUser}
        >
        </SettingProfileScreen>
      </Modal>
      <Infro user={currentUser} currentId={currentId}></Infro>
      <ScrollView>
        <HeaderProfile user={currentUser} currentId={currentId}></HeaderProfile>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        {usersData.map((item) => {
          if (item.id == currentId) {
            return (
              <Story
                key={item.id}
                post={postsData}
                currentId={currentId}
              ></Story>
            );
          }
        })}
        <RenderImg post={postsData} currentId={currentId}></RenderImg>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  button1: {
    borderColor: "#979797",
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 8,
    height: 36,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ProfileScreen;
