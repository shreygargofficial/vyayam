import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import ContextProvider from './components/context/LoaderContextProvider';
import NavigationDecider from './components/navigation/NavigationDecider';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slice/userSlice';
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage
import { PersistGate } from 'redux-persist/integration/react';
import { loaderReducer } from './slice/loaderSlice';
import { mealReducer } from './slice/MealsSlice';
import { snackbarReducer } from './slice/snakbarSlice';
import { exerciseReducer } from './slice/exerciseSlice';
import { splitReducer } from './slice/splitExerciseSlice';
import { useFonts } from 'expo-font';
import CustomLoader from './components/ui/CustomLoader';
import { StatusBar } from 'expo-status-bar';

const persistConfig = {
  key: 'root', // key for the storage
  storage: AsyncStorage, // storage engine (AsyncStorage for React Native)
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({
  reducer: {
    user: persistedReducer,
    loader: loaderReducer,
    meals: mealReducer,
    exercise: exerciseReducer,
    snackbar: snackbarReducer,
    split: splitReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore specific actions
        ignoredPaths: ['register'], // Ignore paths in the state
      },
    }),
});

const persistor = persistStore(store);

//splash screen delay logic
SplashScreen.preventAutoHideAsync();
let delay = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time)
  })
}
//splash screen delay logic end
export default function App() {
  const [loadedFont] = useFonts({
    'king': require('./assets/fonts/king.ttf'),
  })
  useEffect(() => {
    async function callDelay() {
      await delay(3000);
      SplashScreen.hideAsync();
    }
    callDelay()
  }, []);

  if (!loadedFont) {
    return <CustomLoader />
  }
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ContextProvider>
            <NavigationDecider />
            {/* <CustomLoader /> */}
          </ContextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

