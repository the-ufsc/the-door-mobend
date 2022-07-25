import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useForm } from "react-hook-form";

function TextField({ error, label, ...inputProps }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !!error && styles.borderError]}
        {...inputProps}
      />
      {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  );
}

export default function AddScreen({ navigation }) {
  const { register, setValue, getValues, handleSubmit } = useForm();

  function verifyNumber(input) {
    // console.log(input);
    console.log("entrou...", input);
    if (input in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
      console.log("defini");
      setValue("code", input);
    } else {
      console.log("não é um numero");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Door</Text>
      <TextField
        keyboardType="number-pad"
        label={"Código identificador"}
        placeholder={"Digite o código identificador"}
        // onChangeText={(text) => setValue("email", text)}
        // value={getValues("code")}
        value={getValues("code")}

        // onChangeText={(input) => verifyNumber(input)}
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
});
