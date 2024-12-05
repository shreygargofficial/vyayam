import { exerciseReducer } from "./slice/exerciseSlice";
import { loaderReducer } from "./slice/loaderSlice";
import { recipeReducer } from "./slice/recipeSlice";
import { snackbarReducer } from "./slice/snakbarSlice";
import { splitReducer } from "./slice/splitExerciseSlice";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { userReducer } from "./slice/userSlice";
import { dietReducer } from "./slice/dietSlice";

const persistConfig = {
    key: 'root', // key for the storage
    storage: AsyncStorage, // storage engine (AsyncStorage for React Native)
};

const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
    reducer: {
        user: persistedReducer,
        loader: loaderReducer,
        recipes: recipeReducer,
        exercise: exerciseReducer,
        snackbar: snackbarReducer,
        split: splitReducer,
        diet: dietReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Ignore specific actions
                ignoredPaths: ['register'], // Ignore paths in the state
            },
        }),
});

export const persistor = persistStore(store);