import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    supplementData: null,
    supplementError: ""
}
const supplementSlice = createSlice({
    name: 'supplement',
    initialState: initialState,
    reducers: {
        fetchSupplement: (state, action) => {
            state.supplementData = action.payload;
            state.supplementError = "";
            return state;
        },
        supplementLogError: (state, action) => {
            state.supplementError = action.payload;
            return state;
        }
    }
})

export const supplementActions = supplementSlice.actions;
export const supplementReducer = supplementSlice.reducer;