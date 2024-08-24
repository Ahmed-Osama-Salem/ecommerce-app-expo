import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import categoriesReducer from "./slices/categoriesSlice";

import thunk from "redux-thunk";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { useDispatch } from "react-redux";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["guest"],
};

const persistedReducer = persistReducer(persistConfig, categoriesReducer);

// Manually configure middleware array
const middleware = [thunk]; // Add other middleware here if needed

// Use configureStore from Redux Toolkit
const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore persist actions
      },
    }),
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export { persistor, store };
