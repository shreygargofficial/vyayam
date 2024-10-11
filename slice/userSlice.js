import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        error: ""
    },
    reducers: {
        addUserData: (state, action) => {
            state.userData = action.payload;
        },
        logoutUser: (state, action) => {

            state.userData = null;
            state.error = "";
        },
        logError: (state, action) => {
            state.error = action.payload
        }
    }
});


export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
