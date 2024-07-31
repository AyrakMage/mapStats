import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, Alert, Text } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import paths from '../../../assets/india_paths.json';
import debounce from 'lodash/debounce';
import { useNavigation } from '@react-navigation/native';
import { INDIAN_STATES } from '../../data/states'
import { COLORS, FONT_SIZES, SPACING, THEME } from '../../constants';
import  {SCREENS}  from '../screenList';
import StateMapView from './stateMapView';

const { width, height } = Dimensions.get('window');

const HomePage = () => {

  const navigation = useNavigation();

  const debouncedHandleStateClick = useCallback(
    debounce((stateID) => {
      const state = INDIAN_STATES.find(state => state.id === stateID);
      if (!state) {
        Alert.alert(`No Data Available for ${state.name}`);
        return;
      }
      navigation.navigate(SCREENS.STATE_DETAIL_SCREEN, {
        stateID,
        stateName:  state.name,
      });
    }, 200),
    []
  );

  const handleStateClick = (stateID) => {
    debouncedHandleStateClick(stateID);
  };

  const styles = makeStyles(THEME);

  return (
    <SafeAreaView style={styles.container}>
      <Text style = {styles.title} >Click on a state on the map below to get information about a state.</Text>
      <View style={styles.svgContainer}>
        <Svg
          width={width} // Use screen width
          height={height} // Use screen height
          viewBox="0 0 620 680" // Adjust viewBox to match our SVG's original dimensions
          preserveAspectRatio="xMidYMid meet" // Adjusts scaling to maintain aspect ratio
          style={styles.map}
        >
          <G>
            {paths.map((state, index) => (
              <StateMapView state = {state} index={index} handleStateClick ={handleStateClick}/>
            ))}
          </G>
        </Svg>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (theme) =>{
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  title:{
    fontSize: FONT_SIZES.medium,
    fontFamily:'bold',
    textAlign:'center',
    marginTop: SPACING.medium
  },
  svgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });
  return styles;
}

export default HomePage;
