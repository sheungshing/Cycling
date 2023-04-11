import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 5,
  },
  difficulty: {
    fontSize: 16,
    marginBottom: 5,
    color: 'green',
  },
  duration: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
  },
  mapContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    backgroundColor: '#EDEDED',
    // Add a map or graphic of the route
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
});


export default styles;
