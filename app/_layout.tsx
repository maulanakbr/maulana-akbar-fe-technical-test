import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/store/index';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function loadApp() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppReady(true);
      await SplashScreen.hideAsync();
    }

    loadApp();
  }, []);

  if (!appReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.splashText}>Movie List</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{ headerShown: true, title: 'Movie Details' }}
        />
      </Stack>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
