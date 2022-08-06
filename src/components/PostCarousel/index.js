import React from 'react';
import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';





const PostCarousel = (props) => {

  const post = props.post;
  const width = useWindowDimensions().width;

  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate('Post', {postId: post.id});
  }
 
  return (
    // <Pressable onPress={goToPostPage} style={styles.container}>
    <Pressable onPress={goToPostPage} >
      <View style={[styles.container, { width: width - 60 }]}>
        <View style={styles.innerContainer}>
          {/* Image  */}
          <Image
            style={styles.image}
            source={{ uri: post.image }}
          />
          {/* <Text style={styles.placeName}>
          <Text>PlaceName:</Text>
        </Text> */}
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text style={styles.location}>
              <Text> {post.division}</Text>
            </Text>


            <Text >
              Crime No. : {post.crimeNumber}
            </Text>
            <Text >
              Bike No. :  {post.bikeNumber}
            </Text>

            {/* <Text style={styles.description} >
          <Text>Detail Description: {post.description}</Text>
        </Text> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default PostCarousel;

