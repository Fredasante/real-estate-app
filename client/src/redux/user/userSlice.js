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
    DeleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    DeleteUserSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    DeleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    SignOutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    SignOutSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    SignOutFailure: (state, action) => {
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
  DeleteUserStart,
  DeleteUserSuccess,
  DeleteUserFailure,
  SignOutStart,
  SignOutSuccess,
  SignOutFailure,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export default userSlice.reducer;
