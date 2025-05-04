import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idoDetaildata: {},
  loading:false,
  nftDetail:{},
  previousRoute:false,
  isConfetti:false,
  selectedSwapFrom:{},
  selectedSwapTo:{},
  currentStep: 0,
  buyTransactionhash:{},
  domainNftData:{}

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
    setBuytransactionHash(state, action) {
      state.buyTransactionhash = action.payload;
    },
    saveBuydomainNft(state, action) {
      state.domainNftData = action.payload;
    },
    nextStep: (state) => { state.currentStep += 1 },
    previousStep: (state) => { state.currentStep -= 1 },
    goToStep: (state, action) => { state.currentStep = action.payload },
  },
});

export const idoActions = idoSlice.actions;

export default idoSlice;
