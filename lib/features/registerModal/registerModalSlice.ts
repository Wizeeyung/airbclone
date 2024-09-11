import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: ()=> void;
  onClose: ()=> void;
}

const initialState: RegisterModalStore = {
  isOpen: true,
  onOpen: () => {},
  onClose: () => {},
};

export const registerModalSlice = createSlice({
  name: "registerModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = registerModalSlice.actions;

export default registerModalSlice.reducer;