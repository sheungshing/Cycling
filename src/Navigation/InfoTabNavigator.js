import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InfoMapScreen from '../screens/InfoMapScreen';
import PatrolMapScreen from '../screens/PatrolMapScreen';
import Profile from '../components/Profile';

const Tab = createMaterialTopTabNavigator();

const InfoTabNavigator = () => {
  /*<Tab.Screen name={"Crime"} component={InfoMapScreen} 
            options={{title:'Crime'}}
            />*/
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        swipeEnabled: false,
      }}>
      <Tab.Screen name={'Routes'} component={PatrolMapScreen} />
      <Tab.Screen name={'User'} component={Profile} />
    </Tab.Navigator>
  );
};

export default InfoTabNavigator;
