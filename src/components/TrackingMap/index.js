import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';
import RNLocation from 'react-native-location';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

import Geolocation from '@react-native-community/geolocation';

import MapView, {Marker, Polyline} from 'react-native-maps';

const TrackingMap = () => {
  let initialRegion = {
    latitude: 22.41707,
    longitude: 114.22714,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const map = useRef();

  const [initalLocation, setinitalLocation] = useState();
  const [initLatLng, addLatLng] = useState([]);
  const [initLocation, updateLocation] = useState();
  const [initButton, setButton] = useState(false);
  const [initLockView, setLockView] = useState(false);

  const foregroundServiceStart = () => {
    ReactNativeForegroundService.start({
      id: 1,
      title: 'Foreground Service',
      message: 'you are geolocation!',
    });

    ReactNativeForegroundService.add_task(
      () => {
        Geolocation.watchPosition(
          position => {
            console.log(position);
            const tempPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            updateLocation(tempPosition);
            addLatLng(initLatLng => [...initLatLng, tempPosition]);
            // updateLocation(previousPosition => (previousPosition,position));
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            distanceFilter: 5,
          },
        );
      },
      {
        delay: 1500,
        onLoop: false,
        taskId: 'taskid',
        onError: e => console.log('Error logging:', e),
      },
    );
  };

  const foregroundServiceStop = () => {
    ReactNativeForegroundService.remove_all_tasks();
    ReactNativeForegroundService.stop();
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        const setStartRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0421,
        };
        setinitalLocation(setStartRegion);
        map.current.animateToRegion(setStartRegion);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    if (!initLocation) {
      return;
    }
    if (initLockView) {
      const trackRegion = {
        latitude: initLocation.latitude,
        longitude: initLocation.longitude,
        latitudeDelta: 0.0121,
        longitudeDelta: 0.00821,
      };
      // console.log(trackRegion);
      map.current.animateToRegion(trackRegion);
    }
  }, [initLocation]);

  return (
    <View>
      <MapView
        ref={map}
        style={{width: '100%', height: '100%'}}
        showsUserLocation={true}
        initialRegion={initialRegion}>
        <Polyline
          coordinates={initLatLng}
          strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
      </MapView>
      {initButton ? (
        <View style={styles.tracktButton}>
          <Button
            color="red"
            title="Stop"
            onPress={() => {
              foregroundServiceStop();
              addLatLng([]);
              setButton(false);
            }}
          />
        </View>
      ) : (
        <View style={styles.tracktButton}>
          <Button
            title="Start"
            onPress={() => {
              foregroundServiceStart();
              setButton(true);
            }}
          />
        </View>
      )}

      {initLockView ? (
        <View style={styles.lockButton}>
          <Button color='red' title="LockView" onPress={() => setLockView(false)} />
        </View>
      ) : (
        <View style={styles.lockButton}>
          <Button title="LockView" onPress={() => setLockView(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tracktButton: {
    position: 'absolute',
    justifyContent: 'center',
    width: '70%',
    borderRadius: 5,
    bottom: '3%',
    alignSelf: 'center',
  },
  lockButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});

export default TrackingMap;
