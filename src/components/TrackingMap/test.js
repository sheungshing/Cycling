import React, {useEffect, useState, useRef} from 'react';
const geolib = require('geolib');
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  getWeather,
  dailyForecast,
  showWeather,
  getLocation,
} from 'react-native-weather-api';
//import RNLocation from 'react-native-location';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';
import MapView, {Marker, Polyline} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
const apiKey = 'AIzaSyDXM1OETGAv7cr2AXBRf1RwpTiDAOhuJDQ';

const TrackingMap2 = () => {
  let initialRegion = {
    latitude: 22.302711,
    longitude: 114.177216,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const map = useRef();
  const [initalLocation, setinitalLocation] = useState();
  const [initLatLng, addLatLng] = useState([]);
  const [initLocation, updateLocation] = useState();
  const [initButton, setButton] = useState(false);
  const [initLockView, setLockView] = useState(false);
  const [watchId, setWatchId] = useState();
  const [speed, setspeed] = useState('0');
  const [positions, setPositions] = useState([]);
  const [location, setLocation] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [distance, setDistance] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [DashBoardShow, setDashBoardShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //let altitude = 0;
  let totalDistance = 0;
  let startTime = null;

  const BSArray = [
    {
      alerted: false,
      name: 'Tai Shing Stream, Shing Mun',
      latitude: 22.39894963177416,
      longitude: 114.14740932339873,
    },
    {
      alerted: false,
      name: 'Lion Rock Peak',
      latitude: 22.35232973265008,
      longitude: 114.18703856731156,
    },
    {
      alerted: false,
      name: 'Sharp Peak',
      latitude: 22.433357844093003,
      longitude: 114.36681898694634,
    },
    {
      alerted: false,
      name: 'Quadruplex Pool, Sai Kung East',
      latitude: 22.40273134367112,
      longitude: 114.36746100742158,
    },
    {
      alerted: false,
      name: 'Yin Tsz Ngam, Sai Kung East',
      latitude: 22.3874958,
      longitude: 114.3905916,
    },
    {
      alerted: false,
      name: 'Kim Chu Wan, Sai Kung East',
      latitude: 22.357652,
      longitude: 114.37481,
    },
    {
      alerted: false,
      name: 'Bride’s Pool Waterfall, Plover Cove',
      latitude: 22.503327918257988,
      longitude: 114.23921076237822,
    },
    {
      alerted: false,
      name: 'Kau Nga Ling Area, Lantau South',
      latitude: 22.242066994655392,
      longitude: 113.9173329529261,
    },
    {
      alerted: false,
      name: 'Shui Lo Cho, Lantau South',
      latitude: 22.231340044380264,
      longitude: 113.85624283490502,
    },
    {
      alerted: false,
      name: 'Lo Hon Tower, Lantau South',
      latitude: 22.253347790857546,
      longitude: 113.92329645861722,
    },
    {
      alerted: false,
      name: 'Inverted Wrist Cliff, Lantau South',
      latitude: 22.250452545788352,
      longitude: 113.91629723992438,
    },
    {
      alerted: false,
      name: 'Wong Lung Stream, Lantau North',
      latitude: 22.26465488102063,
      longitude: 113.9535242487145,
    },
    {
      alerted: false,
      name: 'Nei San Stream, Lantau North',
      latitude: 22.2818196527751,
      longitude: 113.91646473063562,
    },
    {
      alerted: false,
      name: 'Monkey Cliff, Pat Sin Leng',
      latitude: 22.484221804631954,
      longitude: 114.23491901363708,
    },
    {
      alerted: false,
      name: 'Ping Nam Stream, Pat Sin Leng',
      latitude: 22.513972065567152,
      longitude: 114.209409224866,
    },
    {
      alerted: false,
      name: 'Tai Shek Stream, Tai Mo Shan',
      latitude: 22.421293455981985,
      longitude: 114.12170725593903,
    },
    {
      alerted: false,
      name: 'Tiu Shau Ngam, Ma On Shan',
      latitude: 22.41624550800231,
      longitude: 114.24487709882355,
    },
    {
      alerted: false,
      name: 'Fei Ngo Shan, Ma On Shan',
      latitude: 22.338247825060193,
      longitude: 114.22350691452257,
    },
  ];
  const checkNearBlackSpot = currentPosition => {
    for (let j = 0; j < BSArray.length; j++) {
      const point = {
        latitude: BSArray[j].latitude,
        longitude: BSArray[j].longitude,
      };
      //console.log(point);
      //console.log(currentPosition);
      const distances = geolib.getDistance(currentPosition, point);
      //console.log(BSArray[j].name);
      //console.log(BSArray);
      if (distances < 100 && BSArray[j].alerted == false) {
        //alert
        Alert.alert('Warning', `You are near ${BSArray[j].name}!`, [
          {text: 'OK'},
        ]);
        BSArray[j].alerted = true; //Alerted = true
        //console.log(BSArray);
      }
    }
  };

  const getWeatherdata = (latitude, longitude) => {
    getWeather({
      key: '91eefab72aa00afbb89bd11f60e07cbc',
      lat: latitude,
      lon: longitude,
      unit: 'metric',
    })
      .then(() => {
        let data = new showWeather();
        setWeatherData({temp: data.temp, icon: data.icon});
      })
      .catch(err => {
        console.log(err);
      });
  };

  function getAltitude(latitude, longitude, apiKey) {
    const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`;
    //const url = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoia2FjY2MiLCJhIjoiY2xnNHd3bTE3MDB6NDNkbzZvNWg0MnF1aiJ9.qr15QuFk70dIsHxjbanxJA`;
    //console.log(url);
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        /*
        console.log(data);console.log(data.features[0].properties.ele);
        if (data.features && data.features.length > 0) {
          const altitude = data.features[0].properties.ele;
          console.log("Altitude:" + altitude);
          return altitude;
        } else {
          throw new Error(`Error getting elevation data: ${data.message}`);
        }
        
        const altitude = data.features[0].properties.ele;
        return altitude;*/

        if (data.status === 'OK') {
          console.log('Altitude:' + altitude);
          return altitude;
        } else {
          throw new Error(`Error getting elevation data: ${data.status}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const foregroundServiceStart = () => {
    //Alerted = false;
    // Set all alerted properties to false initially
    startTimer();
    for (let j = 0; j < BSArray.length; j++) {
      BSArray[j].alerted = false;
    }
    addLatLng([]);
    let previousPosition = null;
    let watchId = Geolocation.watchPosition(
      position => {
        const tempPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        //speed
        /*const speedStr = position.coords.speed.toString();
            setspeed(
              speedStr.substring(0, speedStr.length - (speedStr.length - 5)),
            );*/

        // Calculate speed
        let speed = 0;
        if (previousPosition) {
          const distance = geolib.getDistance(previousPosition, tempPosition);
          totalDistance += distance;
          const timeDiff = position.timestamp - previousPosition.timestamp;
          speed = distance / timeDiff;
        } else {
          speed = 0;
        }
        previousPosition = {
          ...tempPosition,
          timestamp: position.timestamp,
        };
        //setspeed(Math.floor(speed*1000));
        setDistance(Math.floor(totalDistance));
        // Calculate average speed
        if (startTime === null) {
          startTime = position.timestamp;
        } else {
          const elapsedTime = position.timestamp - startTime;
          const averageSpeed = totalDistance / elapsedTime;
          setspeed(Math.floor(averageSpeed * 1000));
        }
        checkNearBlackSpot(tempPosition);
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
    setWatchId(watchId);
  };

  const foregroundServiceStop = async () => {
    setspeed('0');
    stopTimer();
    setDistance(0);
    totalDistance = 0;
    Geolocation.clearWatch(watchId);
    let value = await AsyncStorage.getItem('routesId');
    if (value === null) {
      value = '0';
    }
    await AsyncStorage.setItem(value, JSON.stringify(initLatLng)); ////////////////save route
    await AsyncStorage.setItem('routesId', (parseInt(value) + 1).toString());
    uploadResult();
    addLatLng([]);
  };
  //Timer
  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => secs + 1);
    }, 1000);
  };
  const stopTimer = () => {
    setSecondsLeft(0);
    BackgroundTimer.stopBackgroundTimer();
  };

  /*  
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
        getWeatherdata(position.coords.latitude, position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
*/

  //get current location initially
  useEffect(() => {
    const intervalId = setInterval(() => {
      Geolocation.getCurrentPosition(
        //"AIzaSyDXM1OETGAv7cr2AXBRf1RwpTiDAOhuJDQ"
        position => {
          console.log(position);
          const setStartRegion = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0421,
          };
          //console.log('callingGETAltitude');
          setinitalLocation(setStartRegion);
          setLocation(setStartRegion);
          //map.current.animateToRegion(setStartRegion);
          getWeatherdata(position.coords.latitude, position.coords.longitude);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (location) {
      const {latitude, longitude} = location;
      setIsLoading(true);
      getAltitude(latitude, longitude, apiKey).then(altitude => {
        setAltitude(Math.floor(altitude));
        setIsLoading(false);
      });
    }
  }, [location, apiKey]);

  useEffect(() => {
    if (!initLocation) {
      return;
    }
    if (initLockView) {
      console.log(initLocation);
      const trackRegion = {
        latitude: initLocation.latitude,
        longitude: initLocation.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0421,
      };
      // console.log(trackRegion);

      map.current.animateToRegion(trackRegion);
      //getWeatherdata(initLocation.coords.latitude, initLocation.coords.longitude);
      //console.log(weatherData);
    }
  }, [initLocation]);

  //timer change
  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  useEffect(() => {
    if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer();
  }, [secondsLeft]);
  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  // update the result (number of routes finished) after finished
  const uploadResult = async () => {
    try {
      let tRide = await AsyncStorage.getItem('@tRide'); //Distance of ride
      let totalComplete = await AsyncStorage.getItem('@routeCompleted'); // count of route completed
      let rideDetails = await AsyncStorage.getItem('@detailsRide'); //data of ONE ride
      if (tRide !== null) {
        parseFloat(tRide);
        tRide = (parseFloat(tRide) + distance).toFixed(3);
      } else {
        tRide = distance;
      }

      if (totalComplete !== null) {
        totalComplete++;
      } else {
        totalComplete = 1;
      }

      let yourDate = new Date();
      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
      const date = yourDate.toISOString().split('T')[0];
      const time = yourDate.toISOString().split('T')[1].split('.')[0];

      if (rideDetails !== null) {
        console.log(rideDetails);
        let objects = JSON.parse(rideDetails);
        let tempDetail = {
          id: totalComplete - 1,
          dis: distance,
          spe: speed,
          cal: 0,
          date: date,
          time: time,
        };

        let objectArray = objects;
        // objectArray.push(objects)
        objectArray.push(tempDetail);
        rideDetails = JSON.stringify(objectArray);
      } else {
        console.log('else!');
        let object = [];
        let tempDetail = {
          id: 0,
          dis: distance,
          spe: speed,
          cal: 0,
          date: date,
          time: time,
        };
        object.push(tempDetail);
        rideDetails = JSON.stringify(object);
      }

      await AsyncStorage.setItem('@tRide', tRide.toString());
      await AsyncStorage.setItem('@routeCompleted', totalComplete.toString());
      await AsyncStorage.setItem('@detailsRide', rideDetails);
    } catch (e) {
      console.log(e);
    }
  };
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
        <Marker
          icon={require('./alert.png')} //Tai Shing Stream, Shing Mun
          coordinate={{
            latitude: 22.39894963177416,
            longitude: 114.14740932339873,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Lion Rock Peak
          coordinate={{
            latitude: 22.35232973265008,
            longitude: 114.18703856731156,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Sharp Peak, Sai Kung East
          coordinate={{
            latitude: 22.433357844093003,
            longitude: 114.36681898694634,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Quadruplex Pool, Sai Kung East
          coordinate={{
            latitude: 22.40273134367112,
            longitude: 114.36746100742158,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Yin Tsz Ngam, Sai Kung East
          coordinate={{latitude: 22.3874958, longitude: 114.3905916}}
        />
        <Marker
          icon={require('./alert.png')} //Kim Chu Wan, Sai Kung East
          coordinate={{latitude: 22.357652, longitude: 114.37481}}
        />
        <Marker
          icon={require('./alert.png')} //Bride’s Pool Waterfall, Plover Cove
          coordinate={{
            latitude: 22.503327918257988,
            longitude: 114.23921076237822,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Kau Nga Ling Area, Lantau South
          coordinate={{
            latitude: 22.242066994655392,
            longitude: 113.9173329529261,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Shui Lo Cho, Lantau South
          coordinate={{
            latitude: 22.231340044380264,
            longitude: 113.85624283490502,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Lo Hon Tower, Lantau South
          coordinate={{
            latitude: 22.253347790857546,
            longitude: 113.92329645861722,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Inverted Wrist Cliff, Lantau South
          coordinate={{
            latitude: 22.250452545788352,
            longitude: 113.91629723992438,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Wong Lung Stream, Lantau North
          coordinate={{
            latitude: 22.26465488102063,
            longitude: 113.9535242487145,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Nei San Stream, Lantau North
          coordinate={{
            latitude: 22.2818196527751,
            longitude: 113.91646473063562,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Monkey Cliff, Pat Sin Leng
          coordinate={{
            latitude: 22.484221804631954,
            longitude: 114.23491901363708,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Ping Nam Stream, Pat Sin Leng
          coordinate={{
            latitude: 22.513972065567152,
            longitude: 114.209409224866,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Tai Shek Stream, Tai Mo Shan
          coordinate={{
            latitude: 22.421293455981985,
            longitude: 114.12170725593903,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Tiu Shau Ngam, Ma On Shan
          coordinate={{
            latitude: 22.41624550800231,
            longitude: 114.24487709882355,
          }}
        />
        <Marker
          icon={require('./alert.png')} //Fei Ngo Shan, Ma On Shan
          coordinate={{
            latitude: 22.338247825060193,
            longitude: 114.22350691452257,
          }}
        />
      </MapView>

      {/* <WeatherDisplay/> */}
      <View
        //id="weather container"
        style={{
          position: 'absolute',
          top: '28%',
          right: '1%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          opacity: 0.8,
          borderRadius: 5,
        }}>
        {weatherData && (
          <Image
            style={{width: 50, height: 50}}
            source={{uri: `${weatherData.icon}`}}
          />
        )}
        <Text>{weatherData ? Math.floor(weatherData.temp) + 'ºC' : 0}</Text>
      </View>

      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'grey' : 'white',
          },
          styles.dashBoardButtonContainer,
        ]}
        onPress={() => {
          setDashBoardShow(!DashBoardShow);
        }}>
        <View>
          <AntDesign name="dashboard" size={50} color="black" />
        </View>
      </Pressable>

      {DashBoardShow && (
        <View style={styles.dashBoardContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginHorizontal: 10,
                borderRightWidth: 1,
                paddingRight: 10,
              }}>
              Speed: {speed} m/s
            </Text>
            <Text>Distance: {distance} m</Text>
          </View>
          <View>
            <Text
              style={{
                marginHorizontal: 10,
                borderRightWidth: 1,
                paddingRight: 1,
              }}>
              Time:{clockify().displayHours}:{clockify().displayMins}:
              {clockify().displaySecs}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {isLoading ? (
              <Text
                style={{
                  marginHorizontal: 10,
                  borderRightWidth: 1,
                  paddingRight: 10,
                }}>
                Loading altitude data...
              </Text>
            ) : altitude ? (
              <Text
                style={{
                  marginHorizontal: 10,
                  borderRightWidth: 1,
                  paddingRight: 10,
                }}>
                Altitude: {altitude} m
              </Text>
            ) : (
              <Text
                style={{
                  marginHorizontal: 10,
                  borderRightWidth: 1,
                  paddingRight: 10,
                }}>
                Failed to retrieve altitude data.
              </Text>
            )}
          </View>
        </View>
      )}

      {initButton ? (
        <View style={styles.tracktButton}>
          <Button
            color="red"
            title="Stop"
            onPress={async () => {
              await foregroundServiceStop();
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

      {initButton &&
        (initLockView ? (
          <View style={styles.lockButton}>
            <Button
              color="red"
              title="LockView"
              onPress={() => setLockView(false)}
            />
          </View>
        ) : (
          <View style={styles.lockButton}>
            <Button title="LockView" onPress={() => setLockView(true)} />
          </View>
        ))}

      {/* {initLockView ? (
        <View style={styles.lockButton}>
          <Button color='red' title="LockView" onPress={() => setLockView(false)} />
        </View>
      ) : (
        <View style={styles.lockButton}>
          <Button title="LockView" onPress={() => setLockView(true)} />
        </View>
      )} */}
    </View>
  );
};

export default TrackingMap2;

const styles = StyleSheet.create({
  dashBoardButtonContainer: {
    position: 'absolute',
    right: '1%',
    bottom: '55%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 50,
    width: 50,
    padding: 5,
  },
  dashBoardContainer: {
    position: 'absolute',
    top: '10%',
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tracktButton: {
    position: 'absolute',
    bottom: '5%',
    width: '80%',
    borderRadius: 5,
    alignSelf: 'center',
  },
  lockButton: {
    position: 'absolute',
    top: '5%',
    left: '5%',
  },
});
