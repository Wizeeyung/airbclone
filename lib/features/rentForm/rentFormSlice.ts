// rentFormSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RentFormState {
  category: string;
  location: any;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  title: string;
  description: string;
  price: number;
}

const initialState: RentFormState = {
  category: '',
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: '',
  title: '',
  description: '',
  price: 1,
};

export const rentFormSlice = createSlice({
  name: "rentForms",
  initialState,
  reducers: {
    setFieldValue: (state, action: PayloadAction<{ field: keyof RentFormState, value: any }>) => {
      const { field, value } = action.payload;
      (state[field] as any) = value;
    },
    resetForm: () => initialState,
  },
});

export const { setFieldValue, resetForm } = rentFormSlice.actions;
export default rentFormSlice.reducer;
