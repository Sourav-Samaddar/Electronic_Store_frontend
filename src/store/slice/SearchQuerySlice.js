import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
};

const SearchQuerySlice = createSlice ({
    name: "searchQueryString",
    initialState: initialState,
    reducers: {
        setValueToSearch: (state, action) => {
            //console.log(action.payload.value);
            state.searchValue = action.payload.value;
            return state;
        },
    }
    
});

export default SearchQuerySlice.reducer;
export const {setValueToSearch} = SearchQuerySlice.actions;