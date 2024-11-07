import { createSlice } from "@reduxjs/toolkit";

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: {
        exerciseData: null,
        exerciseFetchError: ""
    },
    reducers: {
        fetchExerciseData: (state, action) => {
            state.exerciseData = action.payload;
        },
        logError: (state, action) => {
            state.exerciseFetchError = action.payload
        }
    }
});


export const exerciseActions = exerciseSlice.actions;
export const exerciseReducer = exerciseSlice.reducer;
