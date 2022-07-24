import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen({ children }) {
  const [ready, setReady] = useState(false);

  async function load() {
    await new Promise((r) => setTimeout(r, 5000));
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
            <View style={styles.boxImage}>
              <Image
                style={styles.image}
                source={require("../assets/animado.gif")}
              />
            </View>
            <Text style={styles.text}>The Door</Text>
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

  boxImage: {
    display: "flex",
    alignItems: "center",
  },

  image: {
    width: "100%",
  },

  text: {
    color: "#FFF",
    fontSize: 60,
    fontWeight: "bold",
  },
});
