import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/config";

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      `${server}/api/admin/login`,
      { secretKey },
      config
    );

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

const getAdmin = createAsyncThunk("admin/fetch", async () => {
  try {
    const { data } = await axios.get(`${server}/api/admin/`, {
      withCredentials: true,
    });

    return data.admin;
  } catch (error) {
    throw error.response.data.message;
  }
});

// Thunk for adminLogout

const adminLogout = createAsyncThunk("admin/logout", async () => {
  try {
    const { data } = await axios.get(`${server}/api/admin/logout`, {
      withCredentials: true,
    });

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

export { adminLogin, getAdmin,adminLogout };
