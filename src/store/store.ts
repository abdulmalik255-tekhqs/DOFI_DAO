import { configureStore } from "@reduxjs/toolkit";
import idoSlice from "./reducer/ido-reducer";

const store = configureStore({
  reducer: {
    ido: idoSlice.reducer,
  },
});

export default store;
