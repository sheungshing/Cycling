import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Entypo from "react-native-vector-icons/Entypo"
const PlaceRow = ({data}) => {
    console.log(data);
    return (
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                <Entypo name='location-pin' size={20} color={'white'} />
            </View>
            <Text style={styles.locationText}> {data.description || (data.name + " "+ data.vicinity)}</Text>
        </View>
    );
}

export default PlaceRow;