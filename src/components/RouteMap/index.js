import React from "react";
import { View, Text, Image } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = 'AIzaSyANR3h2G1QwhlFCTlyEvR_gDeQNOJcLeCU';

const RouteMap = ({ origin, destination }) => {

    // console.log(origin)
    // const originLoc = {
    //     latitude: origin.details.geometry.location.lat,
    //     longitude: origin.details.geometry.location.lng,
    //   };
    
    //   const destinationLoc = {
    //     latitude: destination.details.geometry.location.lat,
    //     longitude: destination.details.geometry.location.lng,
    //   };

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
            {/* <MapViewDirections
                origin={originLoc}
                destination={destinationLoc}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
                // mode="BICYCLING"
               //timePrecision="now"
            /> */}
            <Marker  
                coordinate={{ latitude: 22.417070, longitude: 114.227140 }}
               
                >
            </Marker>

            <Marker  
                coordinate={{ latitude: 22.427769, longitude: 114.210288 }}
                
                >
            </Marker>


        </MapView>

    );
}

export default RouteMap;