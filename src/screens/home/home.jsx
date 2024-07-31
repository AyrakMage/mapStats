import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, Alert } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import paths from '../../../assets/india_paths.json';
import debounce from 'lodash/debounce';
import { useNavigation } from '@react-navigation/native';
import { INDIAN_STATES } from '../../data/states'
import { COLORS, THEME } from '../../constants';
import  {SCREENS}  from '../screenList';

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
              <Path
                key={index}
                id={state.id}
                d={state.d}
                fill={THEME.colors.secondary}
                stroke={THEME.colors.white}
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

const makeStyles = (theme) =>{
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
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
