import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SafeUser } from "@/app/types";

// Define the types for the user state
interface UserState {
  currentUser?: SafeUser | null | undefined;
  error: string | null;
  loading: boolean;
}

// You can define the User type based on your application's requirements
// interface User {
//   [key: string]: any;
//   // Add any other user-related fields
// }

// Define the initial state with proper typing
const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    signInSuccess: (state, action: PayloadAction<SafeUser | null>) => {
      state.currentUser = action.payload;
    },

    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    signInStopError: (state) => {
      state.error = null;
    },

    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateSuccess: (state, action: PayloadAction<SafeUser>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOutSuccess: (state) => {
      state.currentUser = null;
     
    }
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signInStopError,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess
} = userSlice.actions;

export default userSlice.reducer;
