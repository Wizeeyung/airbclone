import { createSlice} from "@reduxjs/toolkit";

interface rentModalStore {
  isOpen: boolean;
  onOpen: ()=> void;
  onClose: ()=> void;
}

const initialState: rentModalStore = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

export const rentModalSlice = createSlice({
  name: "rentModal",
  initialState,
  reducers: {
    openModalRent: (state) => {
      state.isOpen = true;
    },
    closeModalRent: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModalRent, closeModalRent } = rentModalSlice.actions;

export default rentModalSlice.reducer;