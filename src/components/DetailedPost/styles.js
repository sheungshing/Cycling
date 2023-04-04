import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  /*
  container: {
    margin: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  description: {
    textAlign:'justify',
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  crimeNumber: {
    // fontSize: 18,
    // marginVertical: 10,
  },
  location:{
    //marginVertical: 0,
    color: '#5b5b5b',
  },
  placeName: {
    textAlign:'justify',
    marginVertical: 10,
    fontSize: 24,
    lineHeight: 24,
    color: 'Red',
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
*/
container: {
  padding: 10,
  backgroundColor: '#fff',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  marginBottom: 10
},
image: {
  width: '100%',
  height: 200,
  resizeMode: 'cover',
  borderRadius: 10,
  marginBottom: 10
},
placeName: {
  fontWeight: 'bold',
  fontSize: 18,
  marginBottom: 5
},
location: {
  fontSize: 16,
  //marginBottom: 5
},
difficulty: {
  fontSize: 16,
  marginBottom: 5,
  color: 'green'
},
details: {
  fontSize: 14,
  marginBottom: 5,
  color: 'gray'
},
description: {
  fontSize: 14,
  marginTop:10,
  lineHeight: 20
}
});

export default styles;
