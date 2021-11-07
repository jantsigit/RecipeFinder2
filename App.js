import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);
  const [data, setData] = useState([]);
 
  const getMeals = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response=>response.json())
      .then(responseData=> {console.log(responseData.meals)
      setData(responseData.meals)
      })
      .catch (err => Alert.alert('Error', error)
      )}
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image style={{  width:250, height:100 }}source={{  uri: item.strMealThumb }} />
          </View>}
        data={meals} 
        ItemSeparatorComponent={listSeparator} /> 
      <TextInput style={{fontSize: 18, width: 200}} placeholder='keyword' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getMeals} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
});