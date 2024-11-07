import { createSlice } from "@reduxjs/toolkit";

const splitSlice = createSlice({
    name: 'split',
    initialState: null,
    reducers: {
        fetchSplit: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})


export const splitActions = splitSlice.actions;
export const splitReducer = splitSlice.reducer;