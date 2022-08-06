import React from "react";
import { View, Text, Image } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'

const TextMap= () => {
    return (

        <MapView
            style={{ width: '100%', height: '100%' }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            zoomControlEnabled={true}
            showsTraffic={false}
            initialRegion={{
                latitude: 37.8025259,
                longitude:  -122.4351431,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker
                coordinate={{ latitude: 22.417070, longitude: 114.227140 }}
            >
            </Marker>

            <Polyline
                coordinates={[
                   
                    { latitude: 37.7896386, longitude: -122.421646 },
                    { latitude: 37.7665248, longitude: -122.4161628 },
                    { latitude: 37.7734153, longitude: -122.4577787 },
                    { latitude: 37.7948605, longitude: -122.4596065 },
                    { latitude: 37.8025259, longitude: -122.4351431 }
                ]}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000'
                ]}
                strokeWidth={6}
            />
        </MapView>

    );
}

export default TextMap;