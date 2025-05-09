import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import idoSlice from "./reducer/ido-reducer";
import { combineReducers } from "redux";
import idodetailSlice from "./reducer/dio-detail.reducer";

// Combine reducers (in case you add more in future)
const rootReducer = combineReducers({
  ido: idoSlice.reducer,
  idodeatil:idodetailSlice.reducer
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["idodeatil"], // state slices to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
