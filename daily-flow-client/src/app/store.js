import { configureStore } from "@reduxjs/toolkit";
import addInputSlice from "../features/addInputSlice/addInputSlice";
import { apiSlice } from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import editTaskSlice from "../features/editTaskSlice/editTaskSlice";
import openModalSlice from "../features/openModalSlice/openModalSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    addInputValue: addInputSlice,
    authSlice,
    modal: openModalSlice,
    editTaskContent: editTaskSlice,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
