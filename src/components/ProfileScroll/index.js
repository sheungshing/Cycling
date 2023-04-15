import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScroll = props => {
  const data = props.data;
  console.log(data)

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{data.date}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Start time: {data.time}</Text>
        <Text style={styles.infoText}>Period: {data.cal}</Text>
        <Text style={styles.infoText}>Distance: {data.dis} km</Text>
        <Text style={styles.infoText}>Avg Speed: {data.spe} km/h</Text>
      </View>
    </View>
  );
};

export default ProfileScroll;

/* Style Sheet */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 5,
  },
  dateContainer: {
    backgroundColor: '#6FB1FC',
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
  },
  date: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 2,
  },
});