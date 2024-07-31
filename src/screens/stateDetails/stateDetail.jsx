import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import DetailView from './components/detailView';
import { convertSnakeCaseToTitleCase } from '../../utils';
import { MaterialIcons } from '@expo/vector-icons';
import SelectStatsView from './components/selectStatsView';
import { APIS } from '../../api/stateDetailsApi';
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING, THEME } from '../../constants';

const StateDetails = ({route}) => {
  const {stateID, stateName} = route.params;
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Modal to show select stats to share dialog
  const [modalVisible, setModalVisible] = useState(false);

  const styles = makeStyles(THEME);

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const response = await axios.get(APIS.getStateDetails);
        const data = response.data.find(state => state.id === stateID);

        // re format the data to accomodate FE
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
        <ActivityIndicator size="large" color={COLORS.black} />
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
        <MaterialIcons name="share" size={20} color="white" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
       <SelectStatsView  stateName = {stateName} onClose={()=>{setModalVisible(false)}} onShare={(selectedProps)=>{setSelectedStats(selectedProps)}} stats={stateData} />
      </Modal>
    </View>
  );
};

const makeStyles = (theme) => {
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    marginBottom: SPACING.medium,
  },
  errorText: {
    color: COLORS.black,
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    bottom: SPACING.xlarge,
    right: SPACING.xlarge,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.xlarge,
    padding: SPACING.medium,
    elevation: 5,
  },
});
return styles;
}

export default StateDetails;
