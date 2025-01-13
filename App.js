import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import ContextProvider from './components/context/LoaderContextProvider';
import NavigationDecider from './components/navigation/NavigationDecider';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { store, persistor } from './redux/store';
import * as Updates from 'expo-updates';
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
    'caviar': require('./assets/fonts/caviar.ttf'),
    'caviari': require('./assets/fonts/caviarI.ttf'),
    'caviarb': require('./assets/fonts/caviarB.ttf')
  });
  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          'Update Available',
          'A new version is available. Would you like to update now?',
          [
            { text: 'Later', style: 'cancel' },
            {
              text: 'Update',
              onPress: async () => {
                await Updates.fetchUpdateAsync();
                Updates.reloadAsync();
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      console.log('Error checking for updates:', e);
    }
  };

  useEffect(() => {
    checkForUpdates();
  }, [])
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
