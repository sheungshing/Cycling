import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  searchIcon: {
    color: '#333',
  },
});

export default styles;