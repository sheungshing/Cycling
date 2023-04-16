import React, { useEffect, useRef, useState } from "react";
import { FlatList, View, useWindowDimensions } from "react-native";
import MapView from 'react-native-maps';
import routes from "../../Assets/data/patrolRoutes";
import RouteLine from "../RouteLine";
import RouteCarousel from "../RouteCarousel";

const PatrolMap = () => {
  const initialRegion = {
    latitude: 22.35037278125,
    longitude: 114.19590679638672,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const flatlist = useRef();
  const map = useRef();
  const width = useWindowDimensions().width;

  useEffect(() => {
    // 獲取最新位置
  }, []);

  useEffect(() => {
    // 選中路線時滾動列表並顯示路線的位置
  }, [selectedRouteId]);

  const handleViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      const selectedRoute = viewableItems[0].item;
      setSelectedRouteId(selectedRoute.id);
      const selectedRouteIndex = routes.findIndex(route => route.id === selectedRoute.id);
      const region = {
        latitude: selectedRoute.coordinate.latitude,
        longitude: selectedRoute.coordinate.longitude,
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      };
      map.current.animateToRegion(region);
      flatlist.current.scrollToIndex({ index: selectedRouteIndex });
    }
  });

  return (
    <View>
      <MapView
        ref={map}
        style={{ width: '100%', height: '100%' }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={false}
        showsTraffic={false}
        initialRegion={initialRegion}>
        {routes.map(route => (
          <RouteLine
            key={route.id}
            geojson={route.geojson}
            strokeColor={route.strokeColor}
            coordinate={route.coordinate}
            isSelected={route.id === selectedRouteId}
            onPress={() => setSelectedRouteId(route.id)}
          />
        ))}
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
          onViewableItemsChanged={handleViewableItemsChanged.current}
          viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        />
      </View>
    </View>
  );
};

export default PatrolMap;