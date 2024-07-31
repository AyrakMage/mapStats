import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './screens/homepage/homepage';
import StateDetailPage from './screens/stateDetailPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="StateDetails" component={StateDetailPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;