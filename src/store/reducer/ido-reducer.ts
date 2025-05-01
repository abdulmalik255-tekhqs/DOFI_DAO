import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idoDetaildata: {},
  loading:false,
  nftDetail:{},
  previousRoute:false,
  isConfetti:false,
  selectedSwapFrom:{},
  selectedSwapTo:{},

};

const idoSlice = createSlice({
  name: "ido",
  initialState,
  reducers: {
    saveIDOdata(state, action) {
      state.idoDetaildata = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setNFTDetail(state, action) {
      state.nftDetail = action.payload;
    },
    setPreviousRoute(state, action) {
      state.previousRoute = action.payload;
    },
    setIsConfetti(state, action) {
      state.isConfetti = action.payload;
    },
    setSelectedSwapFrom(state, action) {
      state.selectedSwapFrom = action.payload;
    },
    setSelectedSwapTo(state, action) {
      state.selectedSwapTo = action.payload;
    },
  },
});

export const idoActions = idoSlice.actions;

export default idoSlice;
