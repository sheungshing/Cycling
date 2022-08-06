import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InfoMapScreen from '../screens/InfoMapScreen';
import PatrolMapScreen from '../screens/PatrolMapScreen';
import NotFound from '../components/NotFound';

const Tab = createMaterialTopTabNavigator();

const InfoTabNavigator =() => {

    return(
        <Tab.Navigator
        screenOptions={{
            tabBarScrollEnabled:true,
            swipeEnabled:false,
            
        }}
        >
            <Tab.Screen name={"Crime"} component={InfoMapScreen} 
            options={{
                title:'Crime',
            }}
            />
            <Tab.Screen name={'patrol'} component={PatrolMapScreen}/>
            <Tab.Screen name={'News'} component={NotFound}/>
           
        </Tab.Navigator>
    );
}

export default InfoTabNavigator;