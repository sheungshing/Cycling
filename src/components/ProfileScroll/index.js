import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileScroll = props => {
  const data = props.data;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.number}> {data.date}</Text>
        
        <View style={{flex: 1, marginHorizontal: 20, padding: 0}}>
          <Text style={styles.text}>Time: {data.time}</Text>
          <Text style={styles.text}>Dis: {data.dis} km</Text>
          
        </View>
        <Text style={styles.text}>AvgSpeed: {"\n"}{data.spe} km/h</Text>
      </View>
    </View>
  );
};

export default ProfileScroll;

/* Style Sheet */
const styles = StyleSheet.create({
    container: {
        height: 60,
        padding: 5,
        backgroundColor: '#F5F5F5',
    },
    innerContainer: {
        flexDirection: 'row',
        backgroundColor: '#9ACD32',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 2.46,
        shadowRadius: 2.14,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    number:{
        fontSize: 18,
        fontWeight: "bold",
        color: 'white',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});