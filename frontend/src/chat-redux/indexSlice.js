import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  officialUser: {},
  users: [],
  userMessage: {},
  Notification: {},
};

export const chatSlice = createSlice({
  name: "data_chat",
  initialState,
  reducers: {
    setOfficialUser: (state) => {
      initialState.officialUser = state;
    },

    setUsers: (state) => {
      initialState.users.push(state);
    },

    setUserMessage: (state) => {
      initialState.userMessage = state;
    },

    setIsAnNotification: (state) => {
      initialState.Notification = state;
    },
  },
});

export const {
  setUserMessage,
  setUsers,
  setOfficialUser,
  setIsAnNotification,
} = chatSlice.actions;

export default chatSlice.reducer;
