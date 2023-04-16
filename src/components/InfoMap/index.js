import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, FlatList, useWindowDimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import CrimeMarker from "../CrimeMarker";
import PostCarousel from "../PostCarousel";
import RNLocation from 'react-native-location';



import places from '../../Assets/data/feed'

import AntDesign from 'react-native-vector-icons/AntDesign'

const InfoMap = () => {

    let initialRegion = {
        latitude: 22.3363998,
        longitude: 114.2632715,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    const [initRegion, setRegion] = useState(initialRegion);

    const [selectedPlaceId, setSelectedPlaceId] = useState();

    const flatlist = useRef();
    const map = useRef();
    const viewConfig = useRef({ itemVisiblePercentThreshold: 70 })
    const onViewChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const selectedPlace = viewableItems[0].item;
            setSelectedPlaceId(selectedPlace.id)
        }
    })

    const width = useWindowDimensions().width;


    useEffect(() => {
        RNLocation.getLatestLocation({ timeout: 60000 })
          .then(latestLocation => {
            console.log(latestLocation);
            const setStartRegion = {
              latitude: latestLocation.latitude,
              longitude: latestLocation.longitude,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0421,
            }
    
            setRegion(setStartRegion);
            map.current.animateToRegion(setStartRegion);
    
          }).catch(err => {
            console.log(err);
    
    
          });
      }, [])


    useEffect(() => {
        if (!selectedPlaceId || !flatlist) {
            console.log("none to choose")

            return;
        }
        const index = places.findIndex(place => place.id === selectedPlaceId);
        flatlist.current.scrollToIndex({ index });

        const selectedPlace = places[index];
        const region = {
            latitude: selectedPlace.coordinate.latitude,
            longitude: selectedPlace.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        //console.warn(index);

        map.current.animateToRegion(region);

    }, [selectedPlaceId])




    return (
        <View >

            <MapView
                ref={map}
                style={{ width: '100%', height: '100%' }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                zoomControlEnabled={false}
                showsTraffic={false}
                initialRegion={initRegion}
            >
                {/* Crime Information Marker */}
                {places.map((place) => (
                    <CrimeMarker
                        coordinate={place.coordinate}
                        crimeNumber={place.crimeNumber}
                        isSelected={place.id === selectedPlaceId}
                        onPress={() => setSelectedPlaceId(place.id)}
                    />
                ))}

            </MapView>
            <View style={{ position: 'absolute', bottom: 5 }}>
                <FlatList
                    ref={flatlist}
                    data={places}
                    renderItem={({ item }) => <PostCarousel post={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    decelerationRate={'normal'}
                    viewabilityConfig={viewConfig.current}
                    onViewableItemsChanged={onViewChanged.current}
                />
            </View>

        </View>
    );
}

export default InfoMap;