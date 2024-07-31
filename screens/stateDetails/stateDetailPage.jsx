import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import DetailView from './components/detailView';
import { convertSnakeCaseToTitleCase } from '../../src/utils';
import ViewShot from 'react-native-view-shot'
import * as Sharing from 'expo-sharing';
import { MaterialIcons } from '@expo/vector-icons';
import SelectStatsView from './components/modalView';
import Share from 'react-native';

const StateDetails = ({route}) => {
  const {stateID, stateName} = route.params;
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStats, setSelectedStats] = useState([]);
  const ref = useRef();

  const captureAndShare = (compRef) =>{
    compRef.current.capture().then(uri => {
      //Sharing.shareAsync(uri)
      Share.share({
        url: uri,
        message:
          'React Native | A framework for building native apps using React',
      })
    }).catch((error)=>{
      console.log(error);
    });
  }

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const response = await axios.get(`https://run.mocky.io/v3/81ecf4bc-4f51-45f9-a220-f1ff49c11c26`);
        const data = response.data.find(state => state.id === stateID);
        const details = Object.keys(data).map(key => ({
          label: convertSnakeCaseToTitleCase(key),
          value: data[key],
          key,
        }));
        setStateData(details);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStateData();
  }, [stateID]);

  //Loading View
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // API error View
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // No Data View
  if (!stateData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available for the selected state.</Text>
      </View>
    );
  }

  // Convert keys to labels. eg: snakeCase -> Snake Case
  const handleShare = () =>{
    setModalVisible(true);
  }

  return ( 
    <View style={styles.container}>
      <Text style = {styles.title}>{stateName}</Text>
      <FlatList
        data={stateData}
        renderItem={({ item }) => <DetailView label={item.label} value={item.value} />}
        keyExtractor={(item) => item.label}
        style={{ flexGrow: 1 }}
      />
      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <MaterialIcons name="share" size={24} color="white" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
       <SelectStatsView  stateName = {stateName} onClose={()=>{setModalVisible(false)}} onShare={(selectedProps)=>{setSelectedStats(selectedProps)}} properties={stateData} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default StateDetails;
