import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  Button,
} from "react-native";
import pokemons from "../../pokemons";
import { Audio } from 'expo-av';

const CardContent = ({ pokemon, i }: any) => (
  <React.Fragment>
    <Image source={{ uri: pokemon.img }} style={styles.cardImg} />
    <Text style={styles.cardTxt}>
      #{i + 1} {pokemon.name}
    </Text>
  </React.Fragment>
);


const Home = ({ navigation }: any) => {
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/opening.mp3')
    );
    setSound(sound);
    await sound.playAsync(); 
  } 
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  return (
    
    <View style={styles.container}>
      <Button title="Play Pokemon Music" onPress={playSound} />
      
      <ScrollView style={styles.scrollContainer}>
        {pokemons.map((pokemon, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => {
              navigation.navigate("detail", { id: i });
            }}
          >
            <View style={styles.card}>
              <CardContent pokemon={pokemon} i={i} />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8c291",
  },
  scrollContainer: {
    marginTop: StatusBar.currentHeight || 10,
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  img: {
    width: 305,
    height: 150,
  },
  btn: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 20,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
  },
  card: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImg: {
    flex:1,
    height: 200,
    margin : 50,
    borderRadius: 15,
    marginBottom: 10
  },
  cardTxt: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
