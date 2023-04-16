import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import InfoTabNavigator from './InfoTabNavigator';
import HomeNaviagtor from './HomeNaviagtor'
import TrackingScreen from '../screens/TrackingScreen';
import Profile from '../components/Profile';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Home'}
        component={HomeNaviagtor}
        options={{
          tabBarIcon: ({color}) => (
            <Fontisto name="search" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Track'}
        component={TrackingScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="play-circle-outline" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="message-square" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
