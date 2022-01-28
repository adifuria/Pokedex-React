import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Share,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";

import pokemons from "../../pokemons";

const WebViewContainer = ({ uri }: { uri: string }) => (
  <WebView style={styles.container} source={{ uri }} />
);


const Detail = ({ route, navigation }: any) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
      
      message: `See this Pokemon is Awesome ${pokemon.name}, Type : ${pokemon.type}, Height : ${pokemon.height}, Weight : ${pokemon.weight}, Weakness : ${pokemon.weaknesses}, ${pokemon.img}`, 
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log("error sharing : ", error);
    }
  };
  
  const [uri, setUri] = useState<string | null>(null);
  const { id } = route.params;
  const pokemon = pokemons[id];
  if (uri) return <WebViewContainer uri={uri} />;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: pokemon.img }} style={styles.img} />
        <Text style={styles.header1}>
          #{Number(id) + 1} {pokemon.name}
        </Text>
        <Text style={styles.text}>Type : {pokemon.type}</Text>
        <Text style={styles.text}>Height : {pokemon.height}</Text>
        <Text style={styles.text}>Weight : {pokemon.weight}</Text>
        <Text style={styles.text}>Weaknesses : {pokemon.weaknesses}</Text>
        
        <TouchableOpacity
          onPress={onShare}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Partager</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8c291",
    flex: 1,
  },
  scrollContainer: {
    marginTop: StatusBar.currentHeight || 10,
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  }, 
  text: {
    paddingLeft: 25
  },
  img: {
    height: 325,
    marginBottom: 10,
  },
  header1: {
    fontSize: 38,
    fontWeight: "bold",
  },
  btn: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 20,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    textAlign: "center",
  },
  btnText: {
    color: "#fff",
  },
});

export default Detail;
