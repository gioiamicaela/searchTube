import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: 0,
  reducers: {
    setVideoLength(state, action) {
      state = action.payload;
    },
  },
});

export const { setVideoLength } = videoSlice.actions;

export default videoSlice.reducer;
