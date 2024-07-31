import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const DetailView = ({ label, value }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 12,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginTop: 4,
  },
});

export default DetailView;