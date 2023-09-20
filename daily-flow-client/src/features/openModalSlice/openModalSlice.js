import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isOpenModal: false,
  modalType: "",
};

const openModalSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpenModal = true;
      state.modalType = action.payload;
    },
    closeModal: (state, action) => {
      state.isOpenModal = false;
      state.modalType = "";
    },
  },
});

export default openModalSlice.reducer;
export const { openModal, closeModal } = openModalSlice.actions;
