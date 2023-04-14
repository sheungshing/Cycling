import React from 'react';
import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const RouteCarousel = (props) => {
  // 从 props 中获取 post 数据和屏幕宽度
  const post = props.post;
  const width = useWindowDimensions().width;

  // 使用 useNavigation hook 获取 navigation 对象
  const navigation = useNavigation();

  // 跳转到帖子详情页面
  const goToPostPage = () => {
    navigation.navigate('Post', {postId: post.id});
  }

  return (
    // 点击整个容器时触发跳转事件
    <Pressable onPress={goToPostPage}>
      <View style={[styles.container, { width: width - 60 }]}>
        <View style={styles.innerContainer}>
          {/* 帖子图片 */}
          <Image
            style={styles.image}
            source={{ uri: post.image }}
          />
          {/* 地点和路线名称 */}
          <View>
            <Text style={styles.location}>
              <Text> {post.division}</Text>
            </Text>
            <Text style={styles.route }>
              {post.routeName}
            </Text>
            {/* 路线距离和时长 */}
            <Text style={styles.distance}>
              Distance:{post.distance}km
            </Text>
            <Text style={styles.duration}>
              Duration:{post.duration}hr(s)
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RouteCarousel;