import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idoDetaildata: {},
};

const idoSlice = createSlice({
  name: "ido",
  initialState,
  reducers: {
    saveIDOdata(state, action) {
      state.idoDetaildata = action.payload;
    },
  },
});

export const idoActions = idoSlice.actions;

export default idoSlice;
