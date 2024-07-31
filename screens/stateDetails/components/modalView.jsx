import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Touchable, TouchableOpacity, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import ViewShot from 'react-native-view-shot'
import DetailView from './detailView';
import * as Sharing from 'expo-sharing';
const SelectStatsView = ({ onClose, properties, onShare, stateID, stateName }) => {
  const [selectedProperties, setSelectedProperties] = useState([]); 
  const ref = useRef();
    console.log("satte", stateName);
  const handleSelectProperty = (key) => {
    setSelectedProperties((prevSelected) => {
      if (prevSelected.includes(key)) {
        return prevSelected.filter(item => item !== key);
      } else {
        return [...prevSelected, key];
      }
    });
  };

  const selectedDetails = properties.filter((item) => {
    return selectedProperties.includes(item.key);
  });


  const handleShare = () => {
    ref.current.capture().then(uri => {
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
            data={properties}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => {
              const {label, key} = item;
              return (
                <TouchableOpacity activeOpacity={1} onPress={()=>handleSelectProperty(key)} style={styles.propertyContainer}>
                  <CheckBox
                    value={selectedProperties.includes(key)}
                    onValueChange={() => handleSelectProperty(key)}
                  />
                  <Text style={styles.propertyLabel}>{label}: {item.value}</Text>
                </TouchableOpacity>
              );
            }}
          />
          
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={onClose} />
            <Button title="Share" onPress={handleShare} />
          </View>
            <ViewShot style={{position:'absolute', left: 1000}} ref={ref} options={{ fileName: stateID + "data", format: "jpg", quality: 0.9 }} >
                <View style = {{flex:1, backgroundColor:'white'}}>
                <Text>
                    {stateName}
                </Text>
                <View>
                    {selectedDetails.map(item=>(
                        <DetailView label={item.label} value={item.value} />
                    ))}
                </View>
                </View>
            </ViewShot>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  propertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  propertyLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SelectStatsView;