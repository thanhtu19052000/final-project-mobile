import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderHome from "../../../components/home/HeaderHome";
import ListPost from "../../../components/home/ListPost";
import { db } from "../../../firebase/config";
import { loadPosts } from "../../../slices/postSlice";
import { loadUsers } from "../../../slices/userSlice";
import CreatePostScreen from "../createPost/CreatePostScreen";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const usersData = useSelector((state) => state.users);
  const postsData = useSelector((state) => state.posts);

  const handleModalCreatePost = (action) => {
    if (action === "open") {
      setModalVisible(true);
    }
    if (action === "close") {
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderHome
        navigation={navigation}
        handleModalCreatePost={handleModalCreatePost}
      />
      <ListPost
        postsData={postsData}
        usersData={usersData}
        navigation={navigation}
      />
      <CreatePostScreen
        modalVisible={modalVisible}
        handleModalCreatePost={handleModalCreatePost}
        usersData={usersData}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "white",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    height: 30,
    width: 60,
    color: "black",
  },
});
