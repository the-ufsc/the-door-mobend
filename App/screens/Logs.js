import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import axios from "axios";
import config from "../config.json";

export default function LogsScreen({ navigation, route }) {
  const id = route.params.id;
  const code = route.params.code;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([{}]);

  useEffect(() => {
    onLoad();
  }, [id]);

  function onLoad() {
    setLoading(true);
    getData();
  }

  function format(num) {
    return ("0" + num).slice(-2);
  }

  function fixTime(data) {
    let newData = new Date(data);
    newData.setHours(newData.getHours() - 3);
    let final = [];

    // ajustar data
    final.push(
      format(newData.getDay()) +
        "/" +
        format(newData.getMonth()) +
        "/" +
        newData.getFullYear()
    );

    // pegar hora
    final.push(format(newData.getHours()) + ":" + format(newData.getMinutes()));

    return final;
  }

  async function getData() {
    axios
      .get(config.url + "/logs/door/" + id)
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }

  async function onDelete() {
    if (!loading) {
      try {
        setLoading(true);
        const result = await axios.delete(config.url + "/logs/door/" + id);
        setLoading(false);
        onLoad();
      } catch {
        setLoading(false);
      }
    }
  }

  function RenderRow({ row, index }) {
    return (
      <View
        style={[
          styles.rowList,
          index % 2 === 0 ? styles.rowWhite : styles.rowGray,
        ]}
      >
        <View style={styles.boxDate}>
          <Text style={styles.textDate}>{fixTime(row.datetime)[0]}</Text>
          <Text>{" - "}</Text>
          <Text style={styles.textTime}>{fixTime(row.datetime)[1]}</Text>
        </View>
        <Text style={styles.textAction}>{row.action}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log's - {code}</Text>

      <View>
        <TouchableOpacity
          onPress={() => onDelete()}
          style={styles.deleteButton}
        >
          <Text style={styles.textButtonSubmit}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>

      {data && data.length > 0 ? (
        <FlatList
          style={styles.boxList}
          data={data}
          renderItem={({ item, index }) => (
            <RenderRow row={item} index={index} />
          )}
          keyExtractor={(item) => item.code}
        />
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Nenhum log encontrado</Text>
        </View>
      )}
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
  textDate: {
    fontSize: 13,
    fontWeight: "500",
  },
  textTime: {
    fontSize: 13,
    fontWeight: "600",
  },
  textAction: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  notFoundContainer: {
    marginTop: 50,
  },
  notFoundText: {
    fontWeight: "700",
    fontSize: 20,
  },
  boxDate: {
    display: "flex",
    flexDirection: "row",
  },
  deleteButton: {
    marginVertical: 10,
    width: "100%",
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  textButtonSubmit: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    paddingVertical: 5,
  },
});
