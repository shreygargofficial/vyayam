import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import ContextProvider from './components/context/LoaderContextProvider';
import NavigationDecider from './components/navigation/NavigationDecider';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { store, persistor } from './redux/store';


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
    'nasa': require('./assets/fonts/nasa.ttf'),

  })

  useEffect(() => {
    async function callDelay() {

      if (loadedFont) {
        await delay(2000);
        await SplashScreen.hideAsync();
      }
    }
    callDelay()
  }, [loadedFont]);

  if (!loadedFont) {
    return null; // Prevent rendering anything until the font is loaded
  }
  console.log(process.env.NODE_ENV);
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
