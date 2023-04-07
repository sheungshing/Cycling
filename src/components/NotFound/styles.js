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
    ////////////////////////
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 30,
      fontWeight: '900',
    },
    nickname: {
      fontSize: 20,
      lineHeight: 20,
      fontWeight: '400',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%'
    },
    menuWrapper: {
      marginTop: 1,
    },
    menuItem: {
      borderRadius: 25,
      backgroundColor: '#99F3F5',
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 40,
      margin: 10
    },
    menuItemText: {
      color: 'black',
      marginLeft: 35,
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 30,
    },
  });
  
export default styles;