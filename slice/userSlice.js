import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
        error: ""
    },
    reducers: {
        addUserData: (state, action) => {
            state.userData = action.payload;
            return state
        },
        deleteUserData: (state, action) => {
            state = {
                userData: {},
                error: ""
            }
            return state
        },
        logError: (state, action) => {
            state.error = action.payload
        }
    }
});


export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
