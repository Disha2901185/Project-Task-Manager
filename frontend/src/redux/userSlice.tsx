import { createSlice } from "@reduxjs/toolkit";

const userSice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
 addUser: (state, action) => {
  if (action.payload) {
    return action.payload;
  }

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  }

  return null;
 },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSice.actions;
export default userSice.reducer;
