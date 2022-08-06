import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  // bedrooms: {
  //   marginVertical: 10,
  //   color: '#5b5b5b',
  // },
  description: {
    textAlign:'justify',
    marginVertical: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  crimeNumber: {
    // fontSize: 18,
    // marginVertical: 10,
  },
  location:{
    marginVertical: 10,
    color: '#5b5b5b',
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
