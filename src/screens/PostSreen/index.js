import { useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import places from "../../Assets/data/feed";
import DetailedPost from "../../components/DetailedPost";


const PostScreen = () => {

    const route = useRoute();

    const post = places.find(place => place.id === route.params.postId);

    return(
        <ScrollView>
        <View style={{backgroundColor:'white'}}>
            {/* <FlatList
                data={feed}
                renderItem={({item}) => <Post post={item} />}
                showsVerticalScrollIndicator={false}
            /> */}
            <DetailedPost post={post}/>
        </View>
        </ScrollView>
    );
}

export default PostScreen;