import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  inputValue: "",
};

const addInputSlice = createSlice({
  name: "addInput",
  initialState,
  reducers: {
    addInputValue: (state, action) => {
      // if (state.inputValue === action.payload) {
      //   state.inputValue = "";
      //   return;
      // }
      state.inputValue = action.payload;
    },
  },
});

export default addInputSlice.reducer;
export const { addInputValue } = addInputSlice.actions;
