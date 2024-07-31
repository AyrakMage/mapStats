import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import ViewShot from 'react-native-view-shot'
import DetailView from './detailView';
import * as Sharing from 'expo-sharing';
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from '../../../constants';

const SelectStatsView = ({ onClose, stats, onShare, stateID, stateName }) => {
  const [selectedProperties, setSelectedProperties] = useState([]); 
  // store ref to the view to capture after selection of properties/stats.
  const captureRef = useRef();

  const handleSelectProperty = (key) => {
    setSelectedProperties((prevSelected) => {
      if (prevSelected.includes(key)) {
        return prevSelected.filter(item => item !== key);
      } else {
        return [...prevSelected, key];
      }
    });
  };

  const selectedDetails = stats.filter((item) => {
    return selectedProperties.includes(item.key);
  });


  // capture view and then share the image captured.
  const handleShare = () => {
    captureRef.current.capture().then(uri => {
        Sharing.isAvailableAsync().then(()=>{
            Sharing.shareAsync(uri);
        }).catch(()=>{
            Alert.prompt( 'Sharing service busy!')
        })
      }).catch((error)=>{
        console.log(error);
      });
  };

  return (
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Properties to Share:</Text>
          <FlatList
            data={stats}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => {
              const {label, key} = item;
              return (
                <TouchableOpacity activeOpacity={1} onPress={()=>handleSelectProperty(key)} style={styles.propertyContainer}>
                  <CheckBox
                    value={selectedProperties.includes(key)}
                    onValueChange={() => handleSelectProperty(key)}
                  />
                  <Text style={styles.propertyLabel}>{label}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <View style={styles.buttonContainer}>
            <Button color={COLORS.primary} title="Close" onPress={onClose} />
            <Button color={COLORS.primary} title="Share" onPress={handleShare} />
          </View>
        </View>
        <ViewShot style={{position:'absolute', justifyContent: 'center', left: 1000}} ref={captureRef} options={{ fileName: stateID + "data", format: "jpg", quality: 0.9 }} >
          <View style = {{flex:1, backgroundColor:COLORS.white}}>
              <Text style={styles.printTitle}>
                  {stateName}
              </Text>
              <View>
                  {selectedDetails.map(item=>(
                      <DetailView key={item.id} label={item.label} value={item.value} />
                  ))}
              </View>
          </View>
        </ViewShot>
      </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', //Semi transparent
  },
  modalContent: {
    width: 300,
    padding: SPACING.large,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
  },
  modalTitle: {
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.large,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  propertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  propertyLabel: {
    fontSize: FONT_SIZES.small,
    marginLeft: SPACING.small,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: SPACING.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  printTitle:{
    fontSize: FONT_SIZES.small,
    marginBottom: SPACING.large,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SelectStatsView;