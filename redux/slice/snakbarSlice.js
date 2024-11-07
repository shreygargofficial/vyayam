import { createSlice } from "@reduxjs/toolkit";

const snakbarSlice = createSlice({
    name: 'snackbar',
    initialState: { show: false, message: '' },
    reducers: {
        enableSnakBar: (state, action) => {
            state.show = true;
            state.message = action.payload
        },
        disableSnakBar: (state, action) => {
            state.show = false;
            state.message = ''
        },
    }
})

export const snackbarReducer = snakbarSlice.reducer;
export const snackbarActions = snakbarSlice.actions;
