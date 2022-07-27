import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import config from "../config.json";

export default function HomeScreen({ navigation }) {
  const [doorsData, setDoorsData] = useState([]);

  useEffect(() => {
    navigation.addListener("focus", () => getData());
  }, [navigation]);

  function getData() {
    axios
      .get(config.url + "/doors")
      .then(function (response) {
        setDoorsData(response.data);
      })
      .catch(function (error) {
        console.log("aqui 01");
        console.error(error);
      });
  }

  function RenderDoor({ door, index }) {
    return (
      <TouchableOpacity
        style={[
          styles.rowList,
          index % 2 === 0 ? styles.rowWhite : styles.rowGray,
        ]}
        onPress={() => navigation.navigate("Edit", { id: door._id })}
      >
        <Text style={styles.textDoor}>Door {door?.code}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minhas Doors</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Adicionar")}
      >
        <Text style={styles.textButton}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.boxList}
        data={doorsData}
        renderItem={({ item, index }) => (
          <RenderDoor door={item} index={index} />
        )}
        keyExtractor={(item) => item.code}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e0dede",
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
  },
  textButton: {
    color: "white",
  },
  boxList: {
    marginVertical: 30,
    width: "100%",
  },
  rowList: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowWhite: {
    backgroundColor: "white",
  },
  rowGray: {
    backgroundColor: "#f1f1f1",
  },
  textDoor: {
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
