import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { addDocument } from "../../../firebase/services";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { FontAwesome5 } from "@expo/vector-icons";
import { useKeyboardHeigh } from "../../../hooks/useKeyboardHeigh";
import { LinearGradient } from "expo-linear-gradient";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const CreatePostScreen = ({
  modalVisible,
  handleModalCreatePost,
  usersData,
}) => {
  const [imageBase64, setImageBase64] = useState([]);
  const [descriptionPost, setDescriptionPost] = useState("");
  const [keyBoardHeigh, setKeyBoardHeigh] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const currentId = useSelector((state) => state.auth.currentId);
  const newKeyboardHeigh = useKeyboardHeigh();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    const currentUser = usersData.filter((user) => user.id === currentId);
    const newUser = currentUser[0];
    setCurrentUser(newUser);
  }, [usersData]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.8,
        base64: true,
      });
      const base64 = `data:image/png;base64,${result.base64}`;
      // console.log(base64);
      if (!result.cancelled) {
        const listImage = [...imageBase64];
        // console.log(listImage);
        listImage.push(base64);
        setImageBase64(listImage);
      }
    } catch (err) {
      console.log("get base64 error", err);
    }
  };

  useEffect(() => {
    setKeyBoardHeigh(newKeyboardHeigh);
  }, [newKeyboardHeigh]);

  const uploadPost = (imageBase64, descriptionPost) => {
    if (!imageBase64.length) return;
    const data = {
      ownerId: currentId,
      liked: [],
      description: descriptionPost,
      images: imageBase64,
      isDeleted: false,
    };

    addDocument("posts", data);
    setImageBase64([]);
    setDescriptionPost("");
    handleModalCreatePost("close");
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <AntDesign
              name="close"
              size={26}
              color="white"
              onPress={() => {
                setImageBase64([]);
                setDescriptionPost("");
                handleModalCreatePost("close");
              }}
              style={{ width: 62 }}
            />
            <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
              New post
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 3,
                paddingHorizontal: 14,
                paddingVertical: 6,
                backgroundColor:
                  descriptionPost && imageBase64.length
                    ? "#1b76f2"
                    : "rgba(255,255,255,0.3)",
              }}
              onPress={() => {
                if (!imageBase64.length || !descriptionPost) {
                  Alert.alert("Please choice image and fill description");
                  return;
                }
                uploadPost(imageBase64, descriptionPost);
              }}
            >
              <Text
                style={{
                  color:
                    descriptionPost && imageBase64.length ? "white" : "#808080",
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 8,
                marginVertical: 10,
              }}
            >
              <LinearGradient
                colors={["#DE0046", "#F7A34B"]}
                style={{
                  height: 42,
                  width: 42,
                  borderRadius: 21,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ height: 40, width: 40, borderRadius: 20 }}
                  source={{ uri: currentUser?.avatar_url }}
                />
              </LinearGradient>
              <Text
                style={{
                  color: "white",
                  paddingLeft: 10,
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {currentUser?.username}
              </Text>
            </View>
            <AutoGrowingTextInput
              minHeight={40}
              width={deviceWidth}
              placeholder="What do you think ?"
              placeholderTextColor="#ccc"
              style={{ color: "white", padding: 8 }}
              onChangeText={(text) => setDescriptionPost(text)}
              value={descriptionPost}
            />

            {imageBase64 &&
              imageBase64.map((image, index) => (
                <Image
                  source={{
                    uri: image,
                  }}
                  key={index}
                  fullWidth={true}
                  resizeMode="cover"
                  style={{
                    height: 250,
                    width: deviceWidth - 16,
                    marginVertical: 16,
                    marginHorizontal: 8,
                    borderRadius: 3,
                  }}
                />
              ))}
          </ScrollView>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: "#2d2d2d",
              height: Platform.OS === "ios" && keyBoardHeigh === 0 ? 80 : 60,
              width: deviceWidth,
              alignItems: "center",
              marginTop: 20,
              flexDirection: "row",
              paddingLeft: 8,
              bottom: 20 + keyBoardHeigh,
              paddingBottom:
                Platform.OS === "ios" && keyBoardHeigh === 0 ? 30 : 0,
            }}
          >
            <FontAwesome5 name="images" size={24} color="green" />
            <Text style={{ color: "white", marginLeft: 10, fontWeight: "500" }}>
              Add image
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    position: "absolute",
    top: Platform.OS === "android" ? -StatusBar.currentHeight : 0,
  },
  modalView: {
    backgroundColor: "black",
    width: deviceWidth,
    height: deviceHeight,
    alignItems: "center",
  },
  headerContainer: {
    height: Platform.OS === "ios" ? 70 : 46,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 30 : 0,
    width: deviceWidth,
  },
});
