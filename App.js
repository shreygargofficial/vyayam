import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import ContextProvider from './components/context/ContextProvider';
import NavigationDecider from './components/navigation/NavigationDecider';

SplashScreen.preventAutoHideAsync();
let delay = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time)
  })
}

export default function App() {

  useEffect(() => {
    async function callDelay() {
      await delay(3000);
      SplashScreen.hideAsync();
    }
    callDelay()
  }, []);

  return (
    <ContextProvider>
      <NavigationDecider />
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
