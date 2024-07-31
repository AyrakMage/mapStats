import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, Alert } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import paths from '../../assets/india_paths.json';
import debounce from 'lodash/debounce';
import { useNavigation } from '@react-navigation/native';

const INDIAN_STATES = [
  { "id": "IN-AN", "name": "Andaman and Nicobar Islands" },
  { "id": "IN-AP", "name": "Andhra Pradesh" },
  { "id": "IN-AR", "name": "Arunachal Pradesh" },
  { "id": "IN-AS", "name": "Assam" },
  { "id": "IN-BR", "name": "Bihar" },
  { "id": "IN-CH", "name": "Chandigarh" },
  { "id": "IN-CT", "name": "Chhattisgarh" },
  { "id": "IN-DD", "name": "Dadra and Nagar Haveli and Daman and Diu" },
  { "id": "IN-DL", "name": "Delhi" },
  { "id": "IN-DN", "name": "Dadra and Nagar Haveli" },
  { "id": "IN-GA", "name": "Goa" },
  { "id": "IN-GJ", "name": "Gujarat" },
  { "id": "IN-HP", "name": "Himachal Pradesh" },
  { "id": "IN-HR", "name": "Haryana" },
  { "id": "IN-JH", "name": "Jharkhand" },
  { "id": "IN-JK", "name": "Jammu and Kashmir" },
  { "id": "IN-KA", "name": "Karnataka" },
  { "id": "IN-KL", "name": "Kerala" },
  { "id": "IN-LD", "name": "Lakshadweep" },
  { "id": "IN-MH", "name": "Maharashtra" },
  { "id": "IN-ML", "name": "Meghalaya" },
  { "id": "IN-MN", "name": "Manipur" },
  { "id": "IN-MP", "name": "Madhya Pradesh" },
  { "id": "IN-MZ", "name": "Mizoram" },
  { "id": "IN-NL", "name": "Nagaland" },
  { "id": "IN-OR", "name": "Odisha" },
  { "id": "IN-PB", "name": "Punjab" },
  { "id": "IN-PY", "name": "Puducherry" },
  { "id": "IN-RJ", "name": "Rajasthan" },
  { "id": "IN-SK", "name": "Sikkim" },
  { "id": "IN-TG", "name": "Telangana" },
  { "id": "IN-TN", "name": "Tamil Nadu" },
  { "id": "IN-TR", "name": "Tripura" },
  { "id": "IN-UP", "name": "Uttar Pradesh" },
  { "id": "IN-UT", "name": "Uttarakhand" },
  { "id": "IN-WB", "name": "West Bengal" }
]

const { width, height } = Dimensions.get('window'); // Get the screen dimensions
const HomePage = () => {

  const navigation = useNavigation();
  const debouncedHandleStateClick = useCallback(
    debounce((stateID) => {
      const state = INDIAN_STATES.find(state => state.id === stateID);
      if (state) {
        Alert.alert(`Clicked on state: ${state.name}`);
      }
      navigation.navigate("StateDetails", {
        stateID,
      });
    }, 200),
    []
  );

  const handleStateClick = (stateID) => {
    debouncedHandleStateClick(stateID);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.svgContainer}>
        <Svg
          width={width} // Use screen width
          height={height} // Use screen height
          viewBox="0 0 620 680" // Adjust viewBox to match your SVG's original dimensions
          preserveAspectRatio="xMidYMid meet" // Adjusts scaling to maintain aspect ratio
          style={styles.map}
        >
          <G>
            {paths.map((state, index) => (
              <Path
                key={index}
                id={state.id}
                d={state.d}
                fill="lightgray"
                stroke="black"
                strokeWidth="1"
                onPress={() => handleStateClick(state.id)}
              />
            ))}
          </G>
        </Svg>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  svgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
  },
});

export default HomePage;
