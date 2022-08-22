import React,{useState} from 'react';
import { View,FlatList,Button,StyleSheet,Text } from 'react-native';
import { Checkbox } from 'react-native-paper';


const data = [
  { id: 1, txt: 'first check', isChecked: false },
  { id: 2, txt: 'second check', isChecked: false },
  { id: 3, txt: 'third check', isChecked: false },
  { id: 4, txt: 'fourth check', isChecked: false },
  { id: 5, txt: 'fifth check', isChecked: false },
  { id: 6, txt: 'sixth check', isChecked: false },
  { id: 7, txt: 'seventh check', isChecked: false },
];

const TestScreen = () => {
  
  const [products, setProducts] = useState(data);

  
  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };

  let selected = products.filter((product) => product.isChecked);

  const renderFlatList = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
         
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  // justifyContent: 'space-between',
                }}>
                <Checkbox
                status={item.isChecked ? 'checked' :'unchecked'}  
                  
                  onPress={() => {
                    handleChange(item.id);
                  }}
                />
                <Text>{item.txt}</Text>
              </View>
            </View>
         
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
    <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
    <Text style={styles.text}>Selected </Text>
    <View style={{ flex: 1 }}>{renderFlatList(selected)}</View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


export default TestScreen;
