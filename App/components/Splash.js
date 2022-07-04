import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen({ children }) {
  const [ready, setReady] = useState(false);

  async function load() {
    await new Promise((r) => setTimeout(r, 3000));
    setReady(true);
  }

  // executa ao renderizar
  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {ready ? (
        children
      ) : (
        <View style={styles.boxFlash}>
          <View>
            <Image style={styles.image} source={require("../assets/house.png")} />
            <Text style={styles.text}>The House</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#303030",
  },

  boxFlash: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },

  image: {
    width: 120,
    height: 120,
  },

  text: {
    color: "#FFF",
    fontSize: 60,
  },
});
