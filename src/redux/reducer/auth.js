import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { adminLogin, adminLogout, getAdmin } from "../thunks/admin";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },

  extraReducers: (builder) => {
    // Getting the Login Info
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.isAdmin = true;
      toast.success(action.payload);
    });

    builder.addCase(adminLogin.rejected, (state, action) => {
      state.isAdmin = false;
      toast.error(action.error.message);
    });

    // Gettting isAdmin
    builder.addCase(getAdmin.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAdmin = true;
      } else state.isAdmin = false;
    });
    builder.addCase(getAdmin.rejected, (state, action) => {
      state.isAdmin = null;
    });

    // Handling Logout admin
    builder.addCase(adminLogout.fulfilled, (state, action) => {
      state.isAdmin = false;
      toast.success(action.payload);
    });

    builder.addCase(adminLogout.rejected, (state, action) => {
      state.isAdmin = true;
      toast.error(action.error.message);
    });
  },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;
