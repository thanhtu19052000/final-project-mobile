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
import { Ionicons } from "@expo/vector-icons";

Story.propTypes = {};

function Story(props) {
  const { post } = props;
  return (
    <View style={styles.container}>
      {/* <View>
        <View style={styles.boder}>
          <Image style={styles.img} source={{ uri: post[1].images[0] }} />
        </View>
        <Text style={styles.text}>Story 1</Text>
      </View>
      <View>
        <View style={styles.boder}>
          <Image style={styles.img} source={{ uri: post[2].images[0] }} />
        </View>
        <Text style={styles.text}>Story 2</Text>
      </View>
      <View>
        <View style={styles.boder}>
          <Image style={styles.img} source={{ uri: post[3].images[0] }} />
        </View>
        <Text style={styles.text}>Story 3</Text>
      </View> */}
      <View>
        <View style={styles.boder1}>
          <Ionicons
            style={{ paddingLeft: 2 }}
            name="add"
            size={36}
            color="white"
          />
        </View>
        <Text style={styles.text}>New</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 8,
    marginHorizontal: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  boder: {
    height: 60,
    width: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60 / 2,
  },
  boder1: {
    width: 60,
    height: 60,
    borderColor: "#979797",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60 / 2,
  },

  text: {
    color: "white",
    textAlign: "center",
    marginTop: 3,
  },
});

export default Story;
