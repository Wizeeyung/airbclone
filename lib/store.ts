import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {userSlice} from "./features/user/userSlice";
// import storage from "./noopStorage";
import { loginModalSlice } from "./features/loginModal/loginModalSlice";
import {registerModalSlice} from "./features/registerModal/registerModalSlice";
import {rentModalSlice} from "./features/rentModal/rentModalSlice";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import {rentFormSlice} from "./features/rentForm/rentFormSlice";
import { searchModalSlice } from "./features/searchModal/searchModalSlice";
 
const persistConfig = {
  key: 'root',
  storage:storage,
  version: 1
};


// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = {
  user: userSlice.reducer,
  registerModal: registerModalSlice.reducer,
  loginModal: loginModalSlice.reducer,
  rentForm: rentFormSlice.reducer,
  rentModal: rentModalSlice.reducer,
  searchModal: searchModalSlice.reducer
 
};

const persistedReducer = persistReducer(persistConfig, combineSlices(rootReducer))




// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({serializableCheck: false});
    },
  });
};

export const store = makeStore();


// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof store.getState>;
// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;