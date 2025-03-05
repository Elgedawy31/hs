import { createSlice } from "@reduxjs/toolkit";

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState: {
    sseData: null
  },
  reducers: {
    updateOnlineUsers: (state, action) => {
      state.sseData = action.payload;
    }
  }
});

export const { updateOnlineUsers } = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;
