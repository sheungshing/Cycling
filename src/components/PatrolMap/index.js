import React, { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, View, useWindowDimensions } from "react-native";
import Post from "../Post";
import routes from "../../Assets/data/patrolRoutes";
import places from '../../Assets/data/feed';
import DetailedPost from "../DetailedPost";
import MapView, { Circle, Geojson, Marker } from 'react-native-maps';
import RouteLine from "../RouteLine";
import PostCarousel from "../PostCarousel";
import RouteCarousel from "../RouteCarousel";
import RNLocation from 'react-native-location';



const PatrolMap = () => {

  let initialRegion = {
    latitude: 22.35037278125,
    longitude: 114.19590679638672,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
const [initRegion, setRegion] = useState(initialRegion);

  const width = useWindowDimensions().width;

  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const flatlist = useRef();
  const map = useRef();
  const viewConfig = useRef({ itemVisiblePercentThreshold: 70 });
  const onViewChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const selectedRoute = viewableItems[0].item;
      setSelectedRouteId(selectedRoute.id)
    }
  })

  
  useEffect(() => {
    RNLocation.getLatestLocation({ timeout: 60000 })
      .then(latestLocation => {
        console.log(latestLocation);
        const setStartRegion = {
          latitude: 22.35037278125,
          longitude: 114.19590679638672,
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
    if (!selectedRouteId || !flatlist) {
      return;
    }
    const index = routes.findIndex(route => route.id === selectedRouteId);
    flatlist.current.scrollToIndex({ index });

    const selectedRoute = routes[index];
    const region = {
      latitude: selectedRoute.coordinate.latitude,
      longitude: selectedRoute.coordinate.longitude,
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0221,
    }

    map.current.animateToRegion(region);

  }, [selectedRouteId])


  return (
    <View>


      <MapView
        ref={map}

        style={{ width: '100%', height: '100%' }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={false}
        showsTraffic={false}
        initialRegion={initRegion}>

        {routes.map((route) => {
          return (
            <View>
              <RouteLine
                geojson={route.geojson}
                strokeColor={route.strokeColor}
                coordinate={route.coordinate}
                isSelected={route.id === selectedRouteId}
                onPress={() => setSelectedRouteId(route.id)}
              />

            </View>
          )
        })}
        


      </MapView>
      <View style={{ position: 'absolute', bottom: 5 }}>
        <FlatList
          ref={flatlist}
          data={routes}
          renderItem={({ item }) => <RouteCarousel post={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 30}
          snapToAlignment={"center"}
          decelerationRate={'normal'}
          viewabilityConfig={viewConfig.current}
          onViewableItemsChanged={onViewChanged.current}
        />
      </View>



    </View>
  );
}

export default PatrolMap;