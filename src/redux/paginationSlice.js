import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "currentPage",
  initialState: 1,
  reducers: {
    setCurrentPage(state, action) {
      state.setCurrentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
