import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentId: "" };

const authSilce = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.currentId = action.payload;
    },
    logoutAction: (state, action) => {
      state.currentId = action.payload;
    },
  },
});

export const { loginAction, logoutAction } = authSilce.actions;
export default authSilce.reducer;
