import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { Card } from "react-native-paper";

export default function CardFavorites({ house }) {
  return (
    <Card style={styles.card}>
      <Card.Title title={house.name} />
      <View>
        <Image
          style={{ height: 200 }}
          source={{
            uri: house.images[0].url,
          }}
        />
      </View>
      <View style={styles.infoBox}>
        <View style={styles.boxCard}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Endereço: </Text>
            {house.address}
          </Text>
          <Text>{formatCurrency({ amount: house.price, code: "BRL" })[0]}</Text>
          <Text>{house.accommodations} alojamentos</Text>
        </View>

        {house.gender === "both" ? (
          <MaterialCommunityIcons name="human-male-female" size={32} color="black" />
        ) : (
          <Ionicons name={house.gender} size={32} color="black" />
        )}
      </View>
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

  boxCard: {
    marginHorizontal: 15,
  },
});
