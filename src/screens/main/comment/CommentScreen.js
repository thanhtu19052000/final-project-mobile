import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  PlatformColor,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import CommentItem from "../../../components/comment/CommentItem";
import { db } from "../../../firebase/config";
import { useKeyboardHeigh } from "../../../hooks/useKeyboardHeigh";
import { Ionicons } from "@expo/vector-icons";
import { addDocument } from "../../../firebase/services";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const CommentScreen = ({ route, navigation }) => {
  const usersData = useSelector((state) => state.users);

  const [commentInput, setCommentInput] = useState("");
  const [keyBoardHeigh, setKeyBoardHeigh] = useState(0);
  const [listComments, setListComments] = useState([]);
  const newKeyboardHeigh = useKeyboardHeigh();

  const { postId, currentId, avatar_url, username, description, timePost } =
    route.params;

  useEffect(() => {
    const unsubscribe = db
      .collection("comments")
      .where("postId", "==", postId)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        console.log("snapshot comment run");
        const documents = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setListComments(documents);
        // schedulePushNotification("thay doi post like", {
        //   data: "hello",
        // });
      });
    return unsubscribe;
  }, []);

  const sendComment = (postId, currentId, commentInput) => {
    const currentUser = usersData.filter((user) => user.id === currentId);
    const { avatar_url, username } = currentUser[0];
    const data = {
      postId: postId,
      userId: currentId,
      description: commentInput,
      avatar_url: avatar_url,
      username: username,
    };

    addDocument("comments", data);
    setCommentInput("");
  };

  useEffect(() => {
    setKeyBoardHeigh(newKeyboardHeigh);
  }, [newKeyboardHeigh]);

  return (
    <View style={styles.container}>
      <FlatList
        data={listComments}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View
            style={{ borderBottomWidth: 0.6, borderBottomColor: "#707070" }}
          >
            <CommentItem
              avatar_url={avatar_url}
              username={username}
              description={description}
              timePost={timePost}
            />
          </View>
        }
        renderItem={({ item }) => (
          <CommentItem
            avatar_url={item.avatar_url}
            username={item.username}
            description={item.description}
            timePost={item.createdAt}
          />
        )}
      />
      <View
        style={{
          position: "absolute",
          bottom: Platform.OS === "ios" ? keyBoardHeigh : 0,
          flexDirection: "row",
          paddingBottom: !keyBoardHeigh && Platform.OS === "ios" ? 30 : 0,
          paddingTop: Platform.OS === "ios" ? 10 : 0,
          borderTopColor: "#707070",
          borderTopWidth: 0.6,
          alignItems: "center",
          width: deviceWidth,
          justifyContent: "space-between",
        }}
      >
        <AutoGrowingTextInput
          minHeight={40}
          width={deviceWidth - 40}
          placeholder="Comment... ?"
          placeholderTextColor="#ccc"
          style={{ color: "white", padding: 8 }}
          onChangeText={(text) => setCommentInput(text)}
          value={commentInput}
        />
        <TouchableOpacity
          onPress={() => {
            if (!commentInput) return;
            sendComment(postId, currentId, commentInput, avatar_url, username);
          }}
        >
          <Ionicons
            name="ios-send"
            size={24}
            style={{
              paddingRight: 8,
              paddingBottom: Platform.OS === "ios" ? 8 : 0,
            }}
            color={commentInput ? "#1b76f2" : "#808080"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "white",
    flex: 1,
    borderWidth: 0.6,
    borderTopColor: "#707070",
    // paddingTop: PlatformColor.OS === "android" ? StatusBar.currentHeight : 0,
  },
  avatar: {
    height: 38,
    width: 38,
    borderRadius: 19,
  },
});
