import React from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";

const CrimeMarker = (props) => {
    const { coordinate, crimeNumber, onPress, isSelected} = props;
    return (
        <Marker
            coordinate={coordinate} onPress={onPress}>
            <View style={{
                backgroundColor: isSelected ? 'white' : 'red',
                opacity: 0.8,
                width: 20,
                height: 20,
                borderRadius: 40}}>
                <Text style={{
                    fontWeight: 'bold',
                    textAlign: 'justify',
                    color: isSelected ? 'red' : 'white',
                }}> {crimeNumber}</Text>
            </View>
        </Marker>
    );
}

export default CrimeMarker;