import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import InfoTabNavigator from './InfoTabNavigator';
import TrackingScreen from '../screens/TrackingScreen';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBarOptions={{
      //     activeTintColor: '#f15454',

      // }}
      // screenOptions={{
      //   tabBarActiveTintColor: '#f15454',
      //   tabBarStyle: [
      //     {
      //       display: 'flex',
      //     },
      //     null,
      //   ],
      // }}
      >
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Fontisto name="search" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Start'}
        component={TrackingScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="play-circle-outline" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Info'}
        component={InfoTabNavigator}
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
