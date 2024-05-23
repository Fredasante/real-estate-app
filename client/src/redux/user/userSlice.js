import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    SignInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    SignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    UpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    UpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  SignInStart,
  SignInSuccess,
  SignInFailure,
  UpdateStart,
  UpdateSuccess,
  UpdateFailure,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export default userSlice.reducer;
