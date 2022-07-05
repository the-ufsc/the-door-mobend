import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { Card } from "react-native-paper";
import { Dimensions } from "react-native";

export default function CardHouse({ house, navigation }) {
  const OnBoardingItem = ({ item }) => {
    return <Image source={{ uri: item.item.url }} style={styles.image} />;
  };

  // console.log(Dimensions.get("screen").width);

  return (
    <Card style={styles.card}>
      <Card.Title title={house.name} />
      <View style={styles.boxImage}>
        <Text style={styles.price}>{formatCurrency({ amount: house.price, code: "BRL" })[0]}</Text>
        <FlatList
          data={house.images}
          style={styles.image}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item?.key)}
          renderItem={(item) => <OnBoardingItem item={item} />}
        />
      </View>
      <View style={styles.infoBox}>
        <View style={styles.boxCard}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Endereço: </Text>
            {house.address}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Alojamentos: </Text>
            {house.accommodations}
          </Text>
        </View>

        {house.gender === "both" ? (
          <MaterialCommunityIcons name="human-male-female" size={32} color="black" />
        ) : (
          <Ionicons name={house.gender} size={32} color="black" />
        )}
      </View>

      <TouchableOpacity
        style={styles.boxAcess}
        onPress={() => navigation.navigate("Detalhes", { house })}
      >
        <Text style={styles.textAcess}>Acessar</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },

  card: {
    marginVertical: 5,
    marginHorizontal: 10,
  },

  boxAcess: {
    backgroundColor: "#17fc03",
    padding: 5,
  },

  price: {
    position: "absolute",
    right: 0,
    margin: 10,
    zIndex: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "right",
    backgroundColor: "#17fc03",
    padding: 5,
    borderRadius: 5,
  },

  textAcess: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  boxCard: {
    marginHorizontal: 15,
  },

  boxImage: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },

  image: {
    width: Dimensions.get("screen").width - 20,
    height: 250,
  },
});
