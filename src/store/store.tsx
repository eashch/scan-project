import { configureStore } from "@reduxjs/toolkit";
import storageSlice from "./storageSlice";

const store = configureStore({ reducer: storageSlice })

export type RootState = ReturnType<typeof store.getState>

export default store;