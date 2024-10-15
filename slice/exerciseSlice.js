import { createSlice } from "@reduxjs/toolkit";

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: {
        exerciseData: null,
        myExercise: null,
        exerciseFetchError: ""
    },
    reducers: {
        fetchExerciseData: (state, action) => {
            state.exerciseData = action.payload;
        },
        myExercise: (state, action) => {
            state.myExercise = action.payload
        },
        logError: (state, action) => {
            state.exerciseFetchError = action.payload
        }
    }
});


export const exerciseActions = exerciseSlice.actions;
export const exerciseReducer = exerciseSlice.reducer;
