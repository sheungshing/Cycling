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

  // bedrooms: {
  //   marginVertical: 10,
  //   color: '#5b5b5b',
  // },
  location: {
    marginVertical: 5,
    color: 'red',
  },

  crimeNumber: {
    fontSize: 15,
    marginVertical: 10,
  },
  // oldPrice: {
  //   color: '#5b5b5b',
  //   textDecorationLine: 'line-through',
  // },
  // price: {
  //   fontWeight: 'bold',
  // },
  // totalPrice: {
  //   color: '#5b5b5b',
  //   textDecorationLine: 'underline',
  // }
});

export default styles;
