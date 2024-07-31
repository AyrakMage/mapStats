import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/screens/home/home';
import StateDetails from './src/screens/stateDetails/stateDetail';

const Stack = createNativeStackNavigator();


// Two page app:
// 1. HomePage : Contains a map of india with slectable state. 
// 2. StateDetails: Contains stats/information about the selected state along with a share button to share one/multiple stats/information.

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name="Home" component={HomePage} />
        <Stack.Screen name="StateDetails" component={StateDetails} options={{ title: 'State Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;