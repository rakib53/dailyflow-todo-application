import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  task: {},
};

const editTaskSlice = createSlice({
  name: "editTask",
  initialState,
  reducers: {
    editTaskValue: (state, action) => {
      state.task = action.payload;
    },
  },
});

export default editTaskSlice.reducer;
export const { editTaskValue } = editTaskSlice.actions;
