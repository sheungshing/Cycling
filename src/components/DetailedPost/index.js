import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './styles.js';
import {useNavigation} from '@react-navigation/native';
import MapView, { Geojson } from 'react-native-maps';


const DetailedPost = props => {
  const post = props.post;
  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate('PostPage', {postId: post.id});
  };

  return (
    <Pressable onPress={goToPostPage} style={styles.container}>
      <Image style={styles.image} source={{uri: post.image}} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{post.name}</Text>
        <Text style={styles.location}>
          {post.division}, {post.district}
        </Text>
        <Text style={styles.difficulty}>Difficulty: {post.difficulty}</Text>
        <Text style={styles.duration}>
          Duration: {post.duration}hr(s) | Length: {post.kilometers}km
        </Text>
        <View style={styles.mapContainer}>
          {/* <MapView
           style={{ width: '100%', height: '100%' }}
           showsUserLocation={true}
           initialRegion={{
            latitude: post.coordinate.latitude,
            longitude: post.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        
        >
          <Geojson
            geojson={post.geojson}
            strokeColor="red"
            strokeWidth={2}
          ></Geojson>
          
          </MapView> */}
          <Text>{post.id}</Text>
         
        </View>
        <Text style={styles.description}>Route Description:</Text>
        <Text style={styles.descriptionText}>
          - Start at {post.startPoint} and follow the trail to {post.endPoint}.
        </Text>
        <Text style={styles.descriptionText}>
          - Along the way, you'll see {post.highlights} and {post.scenicViews}.
        </Text>
        <Text style={styles.descriptionText}>
          - Be sure to bring plenty of water and wear appropriate hiking gear.
        </Text>
      </View>
    </Pressable>
  );
};

export default DetailedPost;
