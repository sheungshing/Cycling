import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import PatrolMapScreen from '../screens/PatrolMapScreen';

const Tab = createMaterialTopTabNavigator();

const HomeTabNavigator = () =>{

    return(
        <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        swipeEnabled: false,
      }}>
      <Tab.Screen name={'Search'} component={HomeScreen} />
      <Tab.Screen name={'Routes'} component={PatrolMapScreen} />
    </Tab.Navigator>
    )
}

export default HomeTabNavigator;