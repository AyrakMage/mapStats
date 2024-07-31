import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/home/homePage.jsx';
import StateDetails from './screens/stateDetails/stateDetailPage.jsx';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="StateDetails" component={StateDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;