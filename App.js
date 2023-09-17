import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const [recipesbyname, setRecipesbyname] = useState([]);
 
  const getRecipes = () => {
    //fetch(`https://api.github.com/search/repositories?q=${keyword}`)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    //fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRecipes(responseJson.meals))
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }

  
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
        style={styles.fList}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image style={styles.image} source={{uri: item.strMealThumb,}}/>
          </View>
        }
        data={recipes} 
        ItemSeparatorComponent={listSeparator} /> 
      <TextInput 
        style={styles.input} 
        placeholder=' search recipes by ingredient' 
        value={keyword}
        onChangeText={text => setKeyword(text)} 
       />
       <View style={styles.buttons}>
        <Button title="Find" onPress={getRecipes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  //backgroundColor: 'lightblue',
  alignItems: 'center',
  justifyContent : 'center',
  //justifyContent: 'space-around',
 },
 fList : {
  //marginLeft : "5%",
  //marginRight : "5%",
 },
 image: {
  width: 80,
  height: 80,
  borderRadius: 15,
},
input: {
  fontSize: 18, 
  width: 300,
  borderWidth: 1,  
},
/*buttons: {
  flexDirection : 'row', 
  justifyContent : 'space-evenly',
  height : 50,
  width : '80%',
  marginTop : 10,
},*/
})