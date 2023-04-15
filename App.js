/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState} from 'react';
import {PermissionsAndroid, Platform, View, Button , AsyncStorage} from 'react-native';
import { requestMultiple, PERMISSIONS} from 'react-native-permissions';


import Router from './src/Navigation/Router';



//Amplify.configure(config);

const App = () =>{

    const[getIn,setgetIn] = useState(false)


  const requestPermission =() => {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
      ]
      // const results = await PermissionsAndroid.requestMultiple(permissions)
      // const allPermissionsGranted = Object.values(results).every(result => result === PermissionsAndroid.RESULTS.GRANTED);
      const location = ()=>{PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Hiking needs to your location' + 'so you can take awesome hiking.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      
      ).then(()=>{
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: 'Background Location Permission',
            message:
              'We need access to your location ' +
              'so you can get live quality updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      }).then((granted)=>{
        //console.log("getting alert")
        return AsyncStorage.getItem('@alert');
      }).then((value)=>{
        if(value === null){
        //  alert("Please restart this application after allowing all permissions");
        console.log(Please restart this application after allowing all permissions)
        }
        AsyncStorage.setItem('@alert', '1');
      })
    }
        
      location();  
  };

   useEffect(() => {
     if (Platform.OS === 'android') {
       // androidPremission();
       // androidPremission2();

       requestPermission();
     } else {
       //for IOS
     }
   }, []);

  return (
   <Router/>
  );
};

export default App;