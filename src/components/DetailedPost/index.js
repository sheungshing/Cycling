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
        <Text>{post.division}</Text>
      </Text>

      <Text style={styles.location}>
        <Text>Location: {post.district}</Text>
      </Text>

      <Text style={styles.location}>
        <Text>Difficulty: {post.difficulty}</Text>
      </Text>

      <Text style={styles.location}>
        <Text>Duration: {post.duration}hr(s) | Length: {post.kilometers}km</Text>
      </Text>

      <Text style={styles.description} >
        <Text>Detail Description: {'\n'}{post.description}</Text>
      </Text>

    </View>
  );
};

export default DetailedPost;
