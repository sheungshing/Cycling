import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InfoMapScreen from '../screens/InfoMapScreen';
import PatrolMapScreen from '../screens/PatrolMapScreen';
import NotFound from '../components/NotFound';

const Tab = createMaterialTopTabNavigator();

const InfoTabNavigator =() => {
/*<Tab.Screen name={"Crime"} component={InfoMapScreen} 
            options={{title:'Crime'}}
            />*/
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarScrollEnabled:true,
            swipeEnabled:false,
            
        }}
        >
            
            <Tab.Screen name={'Routes'} component={PatrolMapScreen}/>
            <Tab.Screen name={'User'} component={NotFound}/>
           
        </Tab.Navigator>
    );
}

export default InfoTabNavigator;