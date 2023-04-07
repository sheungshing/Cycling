import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileScroll = props => {
  const data = props.data;
//   console.log(typeof data)
//   console.log(data)

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.number}> {data.date}</Text>
       
        <View style={{flex: 1, marginHorizontal: 20,padding:0}}>
          <Text>Time: {data.time}</Text>
          <Text>Dis: {data.dis} km</Text>
          <Text>AvgSpeed: {"\n"}{data.spe} km/h</Text>
          
        </View>
        <View style={{flex: 1, marginHorizontal: 5}}>
        <Text style={styles.calories}>Calories: {"\n"}{data.cal} KJ</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScroll;

/* Style Sheet */
const styles = StyleSheet.create({
    container: {
        height: 90,
        padding: 5,
    },
    innerContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
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
        fontWeight: "bold"
    },
    calories:{
        fontSize: 20,
        fontWeight: "bold"
    }
});