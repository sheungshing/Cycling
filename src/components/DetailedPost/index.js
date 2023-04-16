import React, { useRef,useEffect } from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './styles.js';
import {useNavigation} from '@react-navigation/native';
import MapView, {Geojson} from 'react-native-maps';

const DetailedPost = props => {
  const post = props.post;
  console.log(post.coordinate.latitude );
  console.log(post.coordinate.longitude)
  const navigation = useNavigation();

  const mapRef = useRef(null);

  const goToPostPage = () => {
    // navigation.navigate('PostPage', {postId: post.id});
  };

  const animateToPostLocation = () => {
    // 确保在调用 animateToRegion 之前已经初始化了地图组件的引用
    if (mapRef.current) {
      console.log('hahha')
      mapRef.current.animateToRegion({
        latitude: post.coordinate.latitude,
        longitude: post.coordinate.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    }
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
        {/*
        <View style={styles.mapContainer}>
          <MapView
            style={{width: '100%', height: '100%'}}
            showsUserLocation={true}
            initialRegion={{
              latitude: post.coordinate.latitude,
              longitude: post.coordinate.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
              onMapReady={animateToPostLocation}>
            <Geojson
              geojson={post.geojson}
              strokeColor="red"
              fillColor="green"
              strokeWidth={2}></Geojson>
          </MapView>
        </View>

        */}
        <Text style={styles.description}>Route Description:</Text>
        <Text style={styles.descriptionText}>
          {post.description}
        </Text>
        <Text style={styles.descriptionTexts}>
          - Start at {post.startPoint} and follow the trail to {post.endPoint}.
        </Text>
        <Text style={styles.descriptionTexts}>
          - Along the way, you'll see {post.highlights} and {post.scenicViews}.
        </Text>
        <Text style={styles.descriptionTexts}>
          - Be sure to bring plenty of water and wear appropriate hiking gear.
        </Text>
      </View>
    </Pressable>
  );
};

export default DetailedPost;
