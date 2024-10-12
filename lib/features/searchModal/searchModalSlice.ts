import { createSlice } from "@reduxjs/toolkit";

interface searchModalStore {
  isOpen: boolean;
  onOpen: ()=> void;
  onClose: ()=> void;
}

const initialState: searchModalStore = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

export const searchModalSlice = createSlice({
  name: "searchModal",
  initialState,
  reducers: {
    openSearchModal: (state) => {
      state.isOpen = true;
    },
    closeSearchModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openSearchModal, closeSearchModal } = searchModalSlice.actions;

export default searchModalSlice.reducer;