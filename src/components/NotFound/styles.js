import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5FCFF",
      padding: 20,
    },
    profileHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    userIconContainer: {
      marginRight: 10,
    },
    userIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    username: {
      fontWeight: "bold",
      fontSize: 24,
      color: "#0B3142",
    },
    totalHours: {
      color: "#888",
      marginTop: 5,
      color: "#0B3142",
    },
    activityItems: {
      marginTop: 20,
    },
    activityItem: {
      alignItems: "center",
      marginRight: 20,
    },
    activityTitle: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#000000",
    },
    activityValue: {
      color: "#888",
      marginTop: 5,
      color: "#0B3142",
    },
    previousHike: {
        marginTop:30,
    },
    previousHikeTitle: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 10,
      color: "#0B3142",
    },
    previousHikeItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    previousHikeItemTitle: {
      fontWeight: "bold",
      flex: 1,
      color: "#0B3142",
    },
    previousHikeItemHours: {
      color: "#888",
      color: "#0B3142",
    },
    otherDetails: {
      marginTop: 20,
    },
    detail: {
      marginBottom: 10,
      color: "#0B3142",
    },
  });
  
export default styles;