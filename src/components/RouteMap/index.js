import React from "react";
import { View, Text, Image } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = 'AIzaSyANR3h2G1QwhlFCTlyEvR_gDeQNOJcLeCU';

const RouteMap = () => {
    const origin = { latitude: 22.417070, longitude: 114.227140 };
    const destination = { latitude: 22.427769, longitude: 114.210288 };

    return (

        <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
                latitude: 22.417070,
                longitude: 114.227140,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
                // mode="BICYCLING"
               //timePrecision="now"
            />
            <Marker  
                coordinate={{ latitude: 22.417070, longitude: 114.227140 }}
                title={"Ma On Shan"}
                >
            </Marker>

            <Marker  
                coordinate={{ latitude: 22.427769, longitude: 114.210288 }}
                title={"Science Park"}
                >
            </Marker>


        </MapView>

    );
}

export default RouteMap;