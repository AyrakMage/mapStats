import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import DetailView from './components/detailView';
import { convertSnakeCaseToTitleCase } from '../../src/utils';

const StateDetails = ({route}) => {
  const {stateID} = route.params;
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const response = await axios.get(`https://run.mocky.io/v3/81ecf4bc-4f51-45f9-a220-f1ff49c11c26`);
        const data = response.data.find(state => state.id === stateID);
        setStateData(data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStateData();
  }, [stateID]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!stateData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available for the selected state.</Text>
      </View>
    );
  }
  const details = Object.keys(stateData).map(key => ({
    label: convertSnakeCaseToTitleCase(key),
    value: stateData[key],
  }));

  return (
    <View style={styles.container}>
      <Text style = {styles.title}>{stateData.name || stateID}</Text>
      <FlatList
        data={details}
        renderItem={({ item }) => <DetailView label={item.label} value={item.value} />}
        keyExtractor={(item) => item.label}
        contentContainerStyle={styles.grid}
      />
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
});

export default StateDetails;
