import React, { useState } from 'react';
import { G, Path } from 'react-native-svg';
import { COLORS, THEME } from '../../constants';

const StateMapView = ({ state, index, handleStateClick }) => {
  const [pressedState, setPressedState] = useState(null);

  const handlePressIn = () => {
    setPressedState(true);
  };

  const handlePressOut = () => {
    setPressedState(null);
  };

  return (
        <Path
          key={index}
          id={state.id}
          d={state.d}
          fill={pressedState === state.id ? COLORS.primary : COLORS.secondary}
          stroke={COLORS.white}
          strokeWidth="1"
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => handleStateClick(state.id)} // Optional: To handle state click event
        />
  );
};

export default StateMapView;
