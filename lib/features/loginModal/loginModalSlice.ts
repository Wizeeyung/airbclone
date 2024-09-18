import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginModalStore {
  isOpen: boolean;
  onOpen: ()=> void;
  onClose: ()=> void;
}

const initialState: LoginModalStore = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

export const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    openModalLogin: (state) => {
      state.isOpen = true;
    },
    closeModalLogin: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModalLogin, closeModalLogin } = loginModalSlice.actions;

export default loginModalSlice.reducer;