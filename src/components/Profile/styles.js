import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 10,
    marginTop:20,
    //height: 50,
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
    borderTopWidth: 0,
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    padding:5,
  },
  infoBox: {
    marginTop:5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
 
  },
});
  
export default styles;