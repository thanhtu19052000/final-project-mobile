import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { timeDifference } from "../src/utils/timeDifference";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native";
import { TextInput } from "react-native";
import { db } from "../src/firebase/config";
import { addDocument } from "../src/firebase/services";
import { FlatList } from "react-native";

const date = Date.now();

const ItemPost = ({ title, content, createdAt }) => {
  const [timePost, setTimePost] = useState(0);
  const [timeDifferent, setTimeDifferent] = useState(0);
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    const newTimeDifferent = timeDifference(createdAt);
    setTimeDifferent(newTimeDifferent);
  }, [createdAt]);

  useEffect(() => {
    var h = new Date(createdAt).getHours();
    var m = new Date(createdAt).getMinutes();
    var string = " AM";
    if (h > 12) {
      h = h - 12;
      string = " PM";
    }
    if (h < 10) {
      h = `0${h}`;
    }
    if (m < 10) {
      m = `0${m}`;
    }
    var newTimePost = h + ":" + m + string;
    setTimePost(newTimePost);
  }, [createdAt]);

  function randomColors() {
    let colorArray = [];

    for (let i = 0; i < 3; i++) {
      colorArray.push(Math.floor(Math.random() * (255 - 0) + 0));
    }
    // rgb -> hex
    let color = colorArray.map((x) => x.toString(16)).join("");

    return `#${color}`;
  }

  useEffect(() => {
    const randomColor = randomColors();
    setColor(randomColor);
  }, []);

  return (
    <View>
      <Text style={{ marginLeft: 8, marginTop: 8, color: "#333" }}>
        {timeDifferent}
      </Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: color,
          height: 80,
          borderRadius: 8,
          margin: 8,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            width: 50,
            textAlign: "right",
            marginRight: 20,
            color: "#333",
          }}
        >
          {timePost}
        </Text>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#222" }}>
            {title}
          </Text>
          <Text style={{ color: "#222" }}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

const HomeScreenDiary = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [listPost, setListPost] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("diary")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        console.log("snapshot user run");
        const documents = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setListPost(documents);
      });
    return unsubscribe;
  }, []);

  const handleCreatedPost = (title, content) => {
    if (!title) return;
    if (!content) return;

    const data = {
      title: title,
      content: content,
    };

    addDocument("diary", data);

    setTitle("");
    setContent("");
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#2C1A13",
          height: 90,
          justifyContent: "flex-end",
          paddingBottom: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Journal App
        </Text>
      </View>
      <FlatList
        data={listPost}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemPost
            title={item.title}
            content={item.content}
            createdAt={item.createdAt?.toMillis()}
          />
        )}
      />

      <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle="pageSheet"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 8,
          }}
        >
          <Button
            title="Cancel"
            style={{ width: 150 }}
            onPress={() => setModalVisible(false)}
          />
          <Text
            style={{
              fontWeight: "500",
              fontSize: 18,
              paddingTop: 8,
              paddingRight: 20,
            }}
          >
            Add Post
          </Text>
          <Button
            title="Post"
            style={{ width: 150 }}
            onPress={() => handleCreatedPost(title, content)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              borderWidth: 0.6,
              borderColor: "#ccc",
              padding: 16,
              marginBottom: 20,
            }}
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="Fill your title post"
          />
          <TextInput
            style={{
              borderWidth: 0.6,
              borderColor: "#ccc",
              padding: 16,
              marginBottom: 20,
            }}
            value={content}
            onChangeText={(text) => setContent(text)}
            placeholder="Fill your content post"
          />
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          height: 60,
          width: 60,
          backgroundColor: "#6a94a3",
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="pencil" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreenDiary;
