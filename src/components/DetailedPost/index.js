import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';



const DetailedPost = (props) => {

  const post = props.post;

  // const navigation = useNavigation();

  // const goToPostPage = () => {
  //   navigation.navigate('Post', {postId: post.id});
  // }

  return (
    // <Pressable onPress={goToPostPage} style={styles.container}>
    <View style={styles.container}>
      {/* Image  */}
      <Image
        style={styles.image}
        source={{uri: post.image}}
      />
      <Text style={styles.placeName}>
        <Text>PlaceName:</Text>
      </Text>

      <Text style={styles.location}>
        <Text>Location: {post.division}</Text>
      </Text>

      <Text >
        <Text>Crime Number: {post.crimeNumber} | Bike Number: {post.bikeNumber}</Text>
      </Text>

      <Text style={styles.description} >
        <Text>Detail Description: {'\n'}{post.description}</Text>
      </Text>

    </View>
  );
};

export default DetailedPost;
