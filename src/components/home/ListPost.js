import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import HeaderHome from "./HeaderHome";
import PostItem from "./PostItem";
import StoriesBar from "./StoriesBar";

const ListPost = ({ postsData, usersData, navigation }) => {
  const currentId = useSelector((state) => state.auth.currentId);

  const [postsDataState, setPostsDataState] = useState(postsData);

  const getUser = (ownerId) => {
    const dataUsers = usersData.filter((user) => {
      return user.id === ownerId && user;
    });
    const newDataUser = {
      username: dataUsers[0]?.username,
      avatar_url: dataUsers[0]?.avatar_url,
    };
    return newDataUser;
  };

  useEffect(() => {
    const newPostsData = postsData.map((post) => {
      const dataUser = getUser(post.ownerId);
      const newPost = {
        ...post,
        username: dataUser.username,
        avatar_url: dataUser.avatar_url,
      };
      return newPost;
    });
    setPostsDataState(newPostsData);
  }, [postsData]);

  // const [isFetching, setIsFetching] = useState(false);
  // const hello = () => {
  //   console.log("hello");
  //   setIsFetching(true);
  // };
  // console.log(isFetching);
  // const [newPostsDataState, setNewPostsDataState] = useState();
  // useEffect(() => {
  //   const newData = postsDataState.slice(4, postsDataState.length - 1);
  //   setNewPostsDataState(newData);
  // }, []);
  // const loadMoreData = () => {
  //   setNewPostsDataState(postsDataState);
  // };
  // console.log(postsDataState[0].createdAt);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<StoriesBar usersData={usersData} />}
        data={postsDataState}
        keyExtractor={(item) => item.id}
        // onRefresh={hello}
        // refreshing={isFetching}
        // onEndReached={loadMoreData}
        // onEndReachedThreshold={0}
        renderItem={({ item }) => (
          <PostItem
            currentId={currentId}
            description={item.description}
            images={item.images}
            liked={item.liked}
            username={item.username}
            avatar_url={item.avatar_url}
            id={item.id}
            createdAt={item.createdAt}
            ownerId={item.ownerId}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

export default ListPost;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
