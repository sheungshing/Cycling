import React from 'react';
import { View, Text, Image, Pressable, useWindowDimensions, Button } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const RouteCarousel = (props) => {

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
        <View >
          <Text style={styles.location}>
            <Text> {post.division}</Text>
          </Text>

          <Text style={styles.route }>
            {post.routeName}
          </Text>

          <Text style={styles.distance}>
            Distance:{post.distance}km
          </Text>

          <Text style={styles.duration}>
            Duration:{post.duration}hr(s)
          </Text>
          {/* <View style={styles.button}>
            <Button
              title='Start'
             
            />
          </View> */}

          {/* <Text style={styles.description} >
          <Text>Detail Description: {post.description}</Text>
        </Text> */}
        </View>
        
      </View>
    </View>
    </Pressable>
  );
};

export default RouteCarousel;

