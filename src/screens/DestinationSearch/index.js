import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import PlaceRow from "./PlaceRow";


const DestinationSearch = () => {
    const [originalPlace, setOriginalPlace] = useState();
    const [destinationPlace, setDestinationPlace] = useState();

    const navigation = useNavigation();
    


    useEffect(() => {
        // console.warn(' use effect called!!!');
        if(originalPlace && !destinationPlace){
            // console.log(originalPlace)
        }
        if(destinationPlace && !originalPlace){
            // console.log(destinationPlace)
        }
        


        if (originalPlace && destinationPlace) {
            // console.warn(' AND conditions called!!!');
            navigation.navigate('SearchResult' , {
                originalPlace,
                destinationPlace,
                
            });
        }
    }, [originalPlace,destinationPlace]);



    return (
        <SafeAreaView>
            <View style={styles.container}>
                <GooglePlacesAutocomplete
                    placeholder='Your location'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setOriginalPlace({ data, details });
                    }}
                    styles={{
                        textInput: styles.textInput,
                        container: {
                            position: 'absolute',
                            top: 0,
                            left: 10,
                            right: 10,
                        },
                        separator: styles.separator,
                        listView: styles.listView,
                    }}
                    query={{
                        key: 'AIzaSyANR3h2G1QwhlFCTlyEvR_gDeQNOJcLeCU',
                        language: 'en',
                        components: 'country:hk'
                    }}
                    renderRow={(data) => <PlaceRow data={data} />}
                    currentLocation={true}
                    currentLocationLabel='Current location'
                    fetchDetails={true}
                />


                <GooglePlacesAutocomplete
                    placeholder='Destination'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setDestinationPlace({ data, details });
                    }}
                    styles={{
                        textInput: styles.textInput,
                        container: {
                            position: 'absolute',
                            top: 50,
                            left: 10,
                            right: 10,
                        },
                        listView: {
                            position: 'absolute',
                            top: 50
                        },
                        separator: styles.separator,
                    }}
                    query={{
                        key: 'AIzaSyANR3h2G1QwhlFCTlyEvR_gDeQNOJcLeCU',
                        language: 'en',
                        components: 'country:hk'
                    }}
                    renderRow={(data) => <PlaceRow data={data} />}
                    fetchDetails={true}
                />

                {/* Circle near Origin input */}
                <View style={styles.circle} />

                {/* Line between dots */}
                <View style={styles.line} />

                {/* Square near Destination input */}
                <View style={styles.square} />

            </View>


        </SafeAreaView>
    );
}

export default DestinationSearch;


