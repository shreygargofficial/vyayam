import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    dietData: null,
    dietError: ""
}

const dietSlice = createSlice({
    name: 'diet',
    initialState: initialState,
    reducers: {
        fetchDiet: (state, action) => {
            state.dietData = action.payload;
            state.dietError = ""
            return state;
        },
        logDietError: (state, action) => {
            state.dietError = action.payload;
        }
    }
})


export const dietActions = dietSlice.actions;
export const dietReducer = dietSlice.reducer;