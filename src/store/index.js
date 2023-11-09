import { configureStore } from "@reduxjs/toolkit";
import SearchQueryReducer from "./slice/SearchQuerySlice";
import AddresReducer from "./slice/AddressSlice";

const store = configureStore({
  reducer: {
    //reducers goes here
    searchQueryString: SearchQueryReducer,
    selectedDeliveryAddress: AddresReducer
  },
});

export default store;
