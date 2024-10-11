import { createSlice } from "@reduxjs/toolkit";

let loaderSlice = createSlice({
    name: 'loader',
    initialState: false,
    reducers: {
        setLoading: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

export const loaderActions = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;

