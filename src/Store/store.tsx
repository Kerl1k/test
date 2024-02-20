import { configureStore } from "@reduxjs/toolkit";
import companiesSlice from "../Services/companiesSlice";
import employeeSlice from "../Services/employeeSlice";

export const store = configureStore({
  reducer: { companiesSlice, employeeSlice },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
