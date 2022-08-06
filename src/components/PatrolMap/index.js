import React, { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, View, useWindowDimensions } from "react-native";
import Post from "../Post";
import routes from "../../Assets/data/patrolRoutes";
import DetailedPost from "../DetailedPost";
import MapView, { Circle, Geojson, Marker } from 'react-native-maps';
import RouteLine from "../RouteLine";
import PostCarousel from "../PostCarousel";
import RouteCarousel from "../RouteCarousel";



const PatrolMap = () => {

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
        initialRegion={{
          latitude: 22.423929,
          longitude: 114.212952,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

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
        <Circle
          center={{
            latitude: 22.386977,
            longitude: 114.192513,
          }}
          radius={30}
          strokeWidth={3}

        >

        </Circle>


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