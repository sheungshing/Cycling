import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = 'AIzaSyANR3h2G1QwhlFCTlyEvR_gDeQNOJcLeCU';

const RouteMap = ({ origin, destination }) => {
    const [decodedPoints, setDecodedPoints] = useState([]);
    const [duration, setDuration] = useState('');
    const [distance, setDistance] = useState('');

    
    useEffect(() => {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.details.geometry.location.lat},${origin.details.geometry.location.lng}&destination=${destination.details.geometry.location.lat},${destination.details.geometry.location.lng}&mode=walking&key=${GOOGLE_MAPS_APIKEY}`;
    
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const points = data.routes[0].overview_polyline.points;
            setDecodedPoints(decodePolyline(points));
            const duration = data.routes[0].legs[0].duration.text;
            const distance = data.routes[0].legs[0].distance.text;
            setDistance(distance);
            setDuration(duration);
            //console.log('Estimated walking time:', duration, distance);
          });
      }, [origin, destination]);
    
      function decodePolyline(encoded) {
        const polyline = require("@mapbox/polyline");
        return polyline.decode(encoded).map(point => ({
          latitude: point[0],
          longitude: point[1]
        }));
      }

    return (
        <View style ={{width: '100%', height: '100%' }}>
            <View style={{ backgroundColor: '#fff', padding: 10}}>
                <Text>Estimated walking time: {duration}</Text>
                <Text>Distance: {distance}</Text>
            </View>
            <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                    latitude: origin.details.geometry.location.lat,
                    longitude: origin.details.geometry.location.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                <Marker  
                    coordinate={{ latitude: origin.details.geometry.location.lat, longitude: origin.details.geometry.location.lng }}
                
                    >
                </Marker>

                <Marker  
                    coordinate={{ latitude: destination.details.geometry.location.lat, longitude: destination.details.geometry.location.lng }}
                    
                    >
                </Marker>

                <Polyline
                    coordinates={decodedPoints}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={3}
                />

            </MapView>
            
            
        </View>
    );
}

export default RouteMap;