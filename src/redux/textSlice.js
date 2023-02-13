import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "text",
  initialState: {},
  reducers: {
    setSearchText(state, action) {
      state.text = action.payload;
    },
    clearSearchText(state, action) {
      state.text = action.payload;
    },
  },
});

export const { setSearchText, clearSearchText } = textSlice.actions;

export default textSlice.reducer;
