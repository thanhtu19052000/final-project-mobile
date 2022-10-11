import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // likeAction: (state, action) => {
    //   const post = state.filter((post) => post.id === action.payload.id);
    //   post[0].liked.push(action.payload.currentId);
    // },
    // unLikeAction: (state, action) => {
    //   const post = state.filter((post) => post.id === action.payload.id);
    //   const newLiked = post[0].liked.filter(
    //     (like) => like !== action.payload.currentId
    //   );
    //   return state.map((post) => {
    //     if (post.id === action.payload.id) {
    //       return {
    //         ...post,
    //         liked: newLiked,
    //       };
    //     }
    //     return post;
    //   });
    // },
    loadPosts: (state, action) => {
      return action.payload;
    },
  },
});

export const { loadPosts } = postSlice.actions;
export default postSlice.reducer;
