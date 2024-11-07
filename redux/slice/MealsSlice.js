import { createSlice } from "@reduxjs/toolkit";

const mealsSlice = createSlice({
    name: "meal",
    initialState: {
        allMeals: null,
        mealFetchError: ""
    },
    reducers: {
        fetchMeals: (state, action) => {
            state.allMeals = action.payload;
        },
        logError: (state, action) => {
            state.mealFetchError = action.payload
        }

    }
})


export const mealReducer = mealsSlice.reducer;
export const mealActions = mealsSlice.actions;
