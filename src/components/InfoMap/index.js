import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, FlatList, useWindowDimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import CrimeMarker from "../CrimeMarker";
import PostCarousel from "../PostCarousel";



import places from '../../Assets/data/feed'

import AntDesign from 'react-native-vector-icons/AntDesign'

const InfoMap = () => {

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
        if (!selectedPlaceId || !flatlist) {

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
                initialRegion={{
                    latitude: 22.417070,
                    longitude: 114.227140,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
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