import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey } from "../apiConfig/apiKey";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
  search: "",
  success: false,
  data: [],
};

export const searchFun = createAsyncThunk("search/value", async (value) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${apiKey}`
    );
    return response.data.items;
  } catch (error) {
    toast.error(error.response.data.error.status, {
      toastId: "error",
      autoClose: 3000,
    });
  }
});

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFun.pending, (state) => {
        state.loading = true;
        state.data = [];
      })
      .addCase(searchFun.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        if (!state.search)  state.data = [];
      })
      .addCase(searchFun.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
