import React from 'react';
import {View, Text} from 'react-native';
import {Marker} from 'react-native-maps';

const CrimeMarker = props => {
  const {coordinate, crimeNumber, onPress, isSelected} = props;
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View
        style={{
         
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isSelected ? 'red' : 'white',
          opacity: 0.8,
          width: 20,
          height: 20,
         borderRadius: 40,
        }}>
        <Text 
          style={{
            fontSize: 12,
            fontWeight: 'bold',
           
            color: isSelected ? 'white' : 'red',
          }}>
          
          {crimeNumber}
        </Text>
      </View>
    </Marker>
  );
};

export default CrimeMarker;
