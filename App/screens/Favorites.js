import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import homes from "../database/homes.json";
import CardHouse from "../components/CardHouse";
import { verifyIsFavorite } from "../helpers/favorite";

export default function FavoritesScreen({ navigation }) {
  const [houses, setHouses] = useState([]);

  async function getHousesFav() {
    let finalHouses = [];

    for (let home of homes) {
      if (await verifyIsFavorite(home.id)) finalHouses.push(home);
    }

    setHouses([...finalHouses]);
  }

  useEffect(() => {
    getHousesFav();
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Meus Favoritos</Text>
        </View>
        {houses.length ? (
          houses?.map((house, index) => (
            <View key={"house-" + index}>
              <CardHouse navigation={navigation} house={house} index={index} />
            </View>
          ))
        ) : (
          <View>
            <Text style={styles.notFound}>Nenhuma residência favoritada :/</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0dede",
    paddingTop: 10,
  },

  header: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  notFound: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 50,
  },
});
