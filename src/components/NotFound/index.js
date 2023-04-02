import React from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";

import styles from "./styles";

const activities = [
  { key: '1', title: 'Activities', value: '5' },
  { key: '3', title: 'Kilometers', value: '50 km' },
  { key: '4', title: 'Average Speed', value: '10 km/h' },
];

const previousHikes = [
  { key: '1', title: 'Mount Everest', hours: '10 hours' },
  { key: '2', title: 'Grand Canyon', hours: '5 hours' },
  { key: '3', title: 'Yosemite', hours: '8 hours' },
];

const NotFound = () => {
  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <Text style={styles.activityTitle}>{item.title}</Text>
      <Text style={styles.activityValue}>{item.value}</Text>
    </View>
  );

  const renderPreviousHikeItem = ({ item }) => (
    <View style={styles.previousHikeItem}>
      <Text style={styles.previousHikeItemTitle}>{item.title}</Text>
      <Text style={styles.previousHikeItemHours}>{item.hours}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.userIconContainer}>
          <Image source={require('./user-icon.jpg')} style={styles.userIcon} />
          </View>
          <View>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.totalHours}>Total hours hiked: 35 hours</Text>
          </View>
        </View>

        <View style={styles.activityItems}>
          <FlatList
            data={activities}
            renderItem={renderActivityItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.previousHike}>
          <Text style={styles.previousHikeTitle}>Previous Hikes</Text>
          <FlatList
            data={previousHikes}
            renderItem={renderPreviousHikeItem}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.otherDetails}>
          <Text style={styles.detail}>Age: 30 years</Text>
          <Text style={styles.detail}>Gender: Male</Text>
          <Text style={styles.detail}>Nationality: American</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NotFound;