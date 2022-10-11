import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { loadUsers } = userSlice.actions;
export default userSlice.reducer;
