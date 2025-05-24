// File: App.tsx
import 'react-native-gesture-handler';
import React from 'react';

// 1️⃣ Enable native-screen optimizations
import { enableScreens } from 'react-native-screens';
enableScreens();

// 2️⃣ Pull in SafeAreaProvider
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 3️⃣ React Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 4️⃣ Your screens
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ResultsScreen from './src/screens/ResultsScreen';

// 5️⃣ Stack params
export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Results: { isNewHigh: boolean } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  // Wrap the entire navigator in SafeAreaProvider
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
