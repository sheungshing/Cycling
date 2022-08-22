import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DestinationSearch from "../screens/DestinationSearch";
import SearchResult from "../screens/SearchResult";
import HomeTabNavigator from "./HomeTabNavigator";
import PostScreen from "../screens/PostSreen";


const Stack = createNativeStackNavigator();
//
const Router = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator>

                <Stack.Screen
                    name={"HomeScreen"}
                    component={HomeTabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={"DestinationSearch"}
                    component={DestinationSearch} />

                <Stack.Screen
                    name={"SearchResult"}
                    component={SearchResult} />

                <Stack.Screen
                    name={"Post"}
                    component={PostScreen}
                    options={{
                        title:'Crime Sites'
                    }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;