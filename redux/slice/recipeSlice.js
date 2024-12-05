import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
    name: "recipe",
    initialState: {
        allRecipes: null,
        recipeFetchError: ""
    },
    reducers: {
        fetchRecipe: (state, action) => {
            state.allRecipes = action.payload;
        },
        logError: (state, action) => {
            state.recipeFetchError = action.payload
        }

    }
})


export const recipeReducer = recipeSlice.reducer;
export const recipeActions = recipeSlice.actions;
