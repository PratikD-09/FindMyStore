import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
// import usersReducer from "./usersReducer";
import storesReducer from "./storesReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // users: usersReducer,
    stores: storesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;