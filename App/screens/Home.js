import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import homes from "../database/homes.json";
import Filter from "../components/Filter";
import CardHouse from "../components/CardHouse";

export default function HomeScreen({ navigation }) {
  const houses = homes;
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  const [gender, setGender] = useState("any");

  function verify(house) {
    if (house.price >= min && house.price <= max && (gender === "any" || house.gender === gender)) {
      return house;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Filter
          min={min}
          max={max}
          setMin={setMin}
          setMax={setMax}
          gender={gender}
          setGender={setGender}
        />

        {houses?.filter(verify).length ? (
          houses?.filter(verify).map((house, index) => (
            <View key={"house-" + index}>
              <CardHouse navigation={navigation} house={house} index={index} />
            </View>
          ))
        ) : (
          <View>
            <Text style={styles.notFound}>Nenhuma residência encontrada :/</Text>
          </View>
        )}

        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0dede",
  },

  notFound: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 50,
  },
});
