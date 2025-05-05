import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idoDetaildata: {},
};

const idodetailSlice = createSlice({
  name: "idodetail",
  initialState,
  reducers: {
    saveIDOdata(state, action) {
      state.idoDetaildata = action.payload;
    },
  },
});

export const idodetailActions = idodetailSlice.actions;

export default idodetailSlice;
