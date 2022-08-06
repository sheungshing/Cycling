import React from "react";
import { Dimensions, View } from "react-native";
import RouteMap from "../../components/RouteMap";
import { useRoute } from "@react-navigation/native";

const SearchResult = () => {
    const route =useRoute();
    //console.warn(route.params);
    return (
        <View style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            {/* <View style={{
                height: Dimensions.get('window').height-100
            }}> */}
            <View>
                <RouteMap/>

            </View>

        </View>
    );
}

export default SearchResult;