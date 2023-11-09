import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedAddress: {},
};

const AddressSlice = createSlice ({
    name: "selectedDeliveryAddress",
    initialState: initialState,
    reducers: {
        setSelectedAddress: (state, action) => {
            //console.log(action.payload.value);
            state.selectedAddress = action.payload.value;
            return state;
        },
    }
    
});

export default AddressSlice.reducer;
export const {setSelectedAddress} = AddressSlice.actions;