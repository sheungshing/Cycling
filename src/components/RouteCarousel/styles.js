import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 120,
    padding: 5,   
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 2.46,
    shadowRadius: 2.14,
    elevation: 4
  },
  image: {
    height: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
    
  },

  location: {
    fontSize: 17,
    marginHorizontal: 3,
    color: 'red',
    marginBottom: 3,
  },
  route: {
    /*fontSize: 14,
    marginHorizontal: 3,
    marginBottom: 3,*/
    marginHorizontal: 9
  },

  distance: {
    /*fontSize: 14,
    marginHorizontal: 3,
    marginBottom: 3,*/
    marginHorizontal: 9
  },

  duration: {
    /*fontSize: 14,
    marginHorizontal: 3,
    marginBottom: 3,*/
    marginHorizontal: 9
  },
  
  
});

export default styles;
