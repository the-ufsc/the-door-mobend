import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";

import axios from "axios";
import config from "../config.json";

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

export default function EditScreen({ navigation, route }) {
  const id = route.params.id;
  const [formNumber, setFormNumber] = useState({});
  const [formText, setFormText] = useState({});
  const [isActive, setIsActive] = useState(true);
  const [haveError, setHaveError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onLoad();
  }, [id]);

  function onLoad() {
    setLoading(false);
    getData();
  }

  async function getData() {
    axios
      .get(config.url + "/doors/" + id)
      .then(function (response) {
        updateForm(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function updateForm(data) {
    setFormNumber({
      code: data?.code?.toString() || "",
      distanceOpen: data.distanceOpen?.toString() || "",
      openDegree: data.openDegree?.toString() || "",
      closeDegree: data.closeDegree?.toString() || "",
    });
    setIsActive(data.isActivated);
    setFormText({
      initialPosition: data?.initialPosition || "",
      initialHourWorking: data?.initialHourWorking || "",
      endHourWorking: data?.endHourWorking || "",
    });
    setHaveError(false);
  }

  function verifyNumber(input, type) {
    let verifyInput = input.replace(/[^\d]/g, "");
    let newForm = { ...formNumber };
    newForm[type] = verifyInput;
    setFormNumber({ ...newForm });
  }

  function handleFormTextChange(value, type) {
    let newTextForm = { ...formText };
    newTextForm[type] = value;
    setFormText({ ...newTextForm });
  }

  function verifyInputs() {
    let isAllRight = true;
    for (let inputFormNumber in formNumber) {
      let x = formNumber[inputFormNumber];
      try {
        let number = parseInt(x);
        if (number < 1 || number !== number) {
          isAllRight = false;
          break;
        }
      } catch {
        isAllRight = false;
        break;
      }
    }
    if (isAllRight) {
      setHaveError(false);
    } else {
      setHaveError(true);
    }

    return isAllRight;
  }

  async function onDelete() {
    if (!loading) {
      try {
        setLoading(true);
        const result = await axios.delete(config.url + "/doors/" + id);
        setLoading(false);
        navigation.navigate("Inicial");
      } catch {
        setLoading(false);
      }
    }
  }

  async function onSubmit() {
    console.log("opa");
    if (!loading || verifyInputs()) {
      try {
        setLoading(true);
        let date = {
          ...formNumber,
          ...formText,
          isActivated: isActive,
        };
        const result = await axios.patch(config.url + "/doors/" + id, date);
        setLoading(false);
        navigation.navigate("Inicial");
      } catch {
        setLoading(false);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Door {formNumber.code}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Log", { id, code: formNumber?.code })
        }
        style={[styles.logButton, { marginBottom: 20 }]}
      >
        <Text style={{ color: "white" }}>Acessar Log's</Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.containerInput}
      >
        <TextField
          keyboardType="number-pad"
          label={"Código identificador"}
          placeholder={"Ex.: 10"}
          onChangeText={(e) => verifyNumber(e, "code")}
          value={formNumber?.code}
          textAlign="center"
        />
        <TextField
          keyboardType="number-pad"
          label={"Distancia de abertura (cm)"}
          placeholder={"Ex.: 10"}
          onChangeText={(e) => verifyNumber(e, "distanceOpen")}
          value={formNumber.distanceOpen}
          textAlign="center"
        />
        <TextField
          keyboardType="number-pad"
          label={"Grau de abertura"}
          placeholder={"Ex.: 180º"}
          onChangeText={(e) => verifyNumber(e, "openDegree")}
          value={formNumber.openDegree}
          textAlign="center"
        />
        <TextField
          keyboardType="number-pad"
          label={"Grau de fechamento"}
          placeholder={"Ex.: 0º"}
          onChangeText={(e) => verifyNumber(e, "closeDegree")}
          value={formNumber.closeDegree}
          textAlign="center"
        />

        <View style={styles.boxInput}>
          <Text style={styles.label}>
            {isActive ? "Ativado (em funcionamento)" : "Desativado/desligado"}
          </Text>
          <Switch
            trackColor={{ false: "red", true: "green" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(e) => setIsActive(e)}
            value={isActive}
            style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
          />
        </View>
        <View style={[styles.boxInput, { marginTop: 10 }]}>
          <Text style={styles.label}>Posição Inicial</Text>
          <View style={styles.boxButtons}>
            <TouchableOpacity
              onPress={() => handleFormTextChange("open", "initialPosition")}
              style={[
                styles.button,
                formText.initialPosition === "open" && {
                  backgroundColor: "green",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  formText.initialPosition === "open" && {
                    color: "white",
                    fontWeight: "700",
                  },
                ]}
              >
                Aberto
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFormTextChange("close", "initialPosition")}
              style={[
                styles.button,
                formText.initialPosition === "close" && {
                  backgroundColor: "green",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  formText.initialPosition === "close" && {
                    color: "white",
                    fontWeight: "700",
                  },
                ]}
              >
                Fechado
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 20, width: "100%" }}>
            <TouchableOpacity
              onPress={() => onSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.textButtonSubmit}>Atualizar</Text>
            </TouchableOpacity>

            <Text style={styles.textError}>
              {haveError && "Há entradas com erro"}
            </Text>

            <TouchableOpacity
              onPress={() => onDelete()}
              style={styles.deleteButton}
            >
              <Text style={styles.textButtonSubmit}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  logButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
  },
  containerInput: {
    width: "80%",
    maxWidth: 250,
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
    color: "black",
    textAlign: "center",
  },
  label: {
    fontSize: 18,
  },
  input: {
    marginTop: 10,
    backgroundColor: "white",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: "100%",
  },
  boxInput: {
    display: "flex",
    alignItems: "center",
  },
  boxButtons: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    width: 100,
    marginTop: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: "black",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "green",
    borderRadius: 10,
  },
  deleteButton: {
    width: "100%",
    backgroundColor: "red",
    borderRadius: 10,
  },
  textButtonSubmit: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    paddingVertical: 5,
  },
  textError: {
    textAlign: "center",
    color: "red",
    fontWeight: "700",
    marginTop: 10,
  },
});
