import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth";
import api from "./api/api";
import miscSlice from "./reducer/misc";
import chatSlice from "./reducer/chat";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
});

export default store;
