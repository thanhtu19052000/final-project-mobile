import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { likeAction, unLikeAction } from "../../slices/postSlice";
import { timeDifference } from "../../utils/timeDifference";
import PostImage from "./PostImage";
import { Feather } from "@expo/vector-icons";
import { deleteDocument } from "../../firebase/services";

const widthScreen = Dimensions.get("window").width; //full width: ;

const PostHeader = ({ username, avatar_url, id, currentId, ownerId }) => {
  const showConfirmDelete = (id, ownerId, currentId) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this post?",
      [
        {
          text: "Yes",
          onPress: () => {
            deletePost(id, ownerId, currentId);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };
  const deletePost = (id, ownerId, currentId) => {
    if (ownerId === currentId) {
      id && db.collection("posts").doc(id).update({ isDeleted: true });
    } else {
      Alert.alert("You do not have permission to remove post!");
    }
  };

  return (
    <View style={styles.containerHeader}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={["#DE0046", "#F7A34B"]}
          style={{
            borderRadius: 16.5,
            justifyContent: "center",
            alignItems: "center",
            height: 33,
            width: 33,
          }}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: avatar_url,
            }}
          />
        </LinearGradient>

        <Text style={{ color: "white", marginLeft: 10, fontWeight: "600" }}>
          {username}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => showConfirmDelete(id, ownerId, currentId)}
      >
        <Feather name="more-horizontal" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const PostFooter = ({
  liked,
  description,
  currentId,
  username,
  id,
  createdAt,
  navigation,
  avatar_url,
}) => {
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(liked.length);
  const [timePost, setTimePost] = useState(0);

  useEffect(() => {
    // const idInterval = setInterval(() => {
    const newTimePost = timeDifference(createdAt?.toMillis());
    setTimePost(newTimePost);
    // }, 180000);

    // return () => clearInterval(idInterval);
  }, []);

  useEffect(() => {
    liked.forEach((like) => {
      if (currentId === like) {
        setIsLike(true);
      }
    });
  }, [liked]);

  useEffect(() => {
    const likeNumber = liked.length;
    setLikes(likeNumber);
  }, [liked]);

  const handleLike = (id, currentId) => {
    if (isLike) {
      const newLiked = [...liked];
      const newRemoveLike = newLiked.filter((like) => like !== currentId);
      db.collection("posts").doc(id).update({ liked: newRemoveLike });
      setIsLike(false);
    } else {
      const newAddLike = [...liked];
      newAddLike.push(currentId);
      db.collection("posts").doc(id).update({ liked: newAddLike });
      setIsLike(true);
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          height: 38,
          width: widthScreen,
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 40,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => handleLike(id, currentId)}>
            {isLike ? (
              <Image
                style={styles.icon}
                source={require("../../res/images/redHeart.png")}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require("../../res/images/like.png")}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Comment", {
                postId: id,
                currentId: currentId,
                avatar_url: avatar_url,
                username: username,
                description: description,
                timePost: timePost,
              })
            }
          >
            <Image
              style={styles.icon}
              source={require("../../res/images/comment.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.icon}
              source={require("../../res/images/direct_message.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 40,
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Image
              style={styles.iconBookMark}
              source={require("../../res/images/bookmark.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ marginLeft: 8, color: "white", fontWeight: "600" }}>
        {likes} Likes
      </Text>
      <View style={{ marginHorizontal: 8, marginTop: 4 }}>
        <Text style={{ color: "white", fontWeight: "600" }} numberOfLines={2}>
          {username}
          <Text style={{ color: "white", fontWeight: "400" }}>
            {"  "}
            {description}
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Comment", {
            postId: id,
            currentId: currentId,
            avatar_url: avatar_url,
            username: username,
            description: description,
            timePost: timePost,
          })
        }
      >
        <Text
          style={{
            marginLeft: 8,
            color: "#808080",
            fontSize: 12,
            marginTop: 4,
          }}
        >
          See all comments...
        </Text>
      </TouchableOpacity>
      <Text
        style={{ marginLeft: 8, color: "#808080", fontSize: 12, marginTop: 4 }}
      >
        {timePost}
      </Text>
    </View>
  );
};
const PostItem = ({
  currentId,
  description,
  images,
  liked,
  username,
  avatar_url,
  id,
  createdAt,
  navigation,
  ownerId,
}) => {
  return (
    <View style={styles.container}>
      <PostHeader
        username={username}
        avatar_url={avatar_url}
        id={id}
        currentId={currentId}
        ownerId={ownerId}
      />
      <PostImage images={images} />
      <PostFooter
        currentId={currentId}
        liked={liked}
        description={description}
        username={username}
        id={id}
        createdAt={createdAt}
        navigation={navigation}
        avatar_url={avatar_url}
      />
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  containerHeader: {
    height: 50,
    width: widthScreen,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
  },
  icon: {
    height: 18,
    width: 18,
    marginLeft: 8,
    marginRight: 6,
  },
  iconBookMark: {
    height: 18,
    width: 18,
    marginRight: 8,
  },
});
