import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions } from "react-native";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";

import { formatCurrency } from "react-native-format-currency";
import MapView, { Marker } from "react-native-maps";
import { insertValue, removeValue, verifyIsFavorite } from "../helpers/favorite";
import { useEffect } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

export default function DetailsScreen(props) {
  const house = props.route.params.house;
  const [isFavorite, setIsFavorite] = useState(false);

  const OnBoardingItem = ({ item }) => {
    return <Image source={{ uri: item.item.url }} style={styles.image} />;
  };

  // toda vez que abrir um detalhe vai verificar se eh favorito e setar
  useEffect(() => {
    setIsFavorite(false);
    verifyIsFavorite(house.id).then(
      function (isFav) {
        setIsFavorite(isFav);
      },
      function (e) {
        console.log("Error", e);
      }
    );
  }, [house]);

  function handleFavorite() {
    try {
      if (isFavorite) {
        removeValue(house.id);
        setIsFavorite(false);
      } else {
        insertValue(house.id);
        setIsFavorite(true);
      }
    } catch (e) {
      console.log("Error", e);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
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

        {/* <Image style={styles.image} source={{ uri: house.images[0].url }} /> */}
        <View style={styles.topBox}>
          <View>
            <View opacity={0.4}>
              <Text style={[styles.title, { fontSize: 20 }]}>Alojamento {house.type}</Text>
            </View>
            <View>
              <Text style={[styles.title, { fontSize: 30 }]}>
                {formatCurrency({ amount: house.price, code: "BRL" })[0]}
              </Text>
            </View>
          </View>
          <View style={styles.icons}>
            {house.gender === "both" ? (
              <MaterialCommunityIcons name="human-male-female" size={32} color="black" />
            ) : (
              <Ionicons name={house.gender} size={32} color="black" />
            )}
            <TouchableOpacity
            // onPress={()=>addFav(house)}
            >
              <MaterialCommunityIcons
                onPress={() => handleFavorite()}
                name={isFavorite ? "star" : "star-outline"}
                size={60}
                color="orange"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoTitle}>
            <Text style={[{ textAlign: "center" }, { fontSize: 22 }]}>{house.address}</Text>
          </View>
          <View style={styles.infoText}>
            <Text style={styles.information}>•</Text>
            <Text style={styles.information}>Área: {house.area} m2</Text>
          </View>
          <View style={styles.infoText}>
            <Text style={styles.information}>•</Text>
            <Text style={styles.information}>Alojamentos: {house.accommodations}</Text>
          </View>
          <View style={styles.infoText}>
            <Text style={styles.information}>•</Text>
            <Text style={styles.information}>Banheiro: {house.bathroom}</Text>
          </View>
          <View style={styles.infoText}>
            <Text style={styles.information}>•</Text>
            <Text style={styles.information}>Mobília: {house.equipments}</Text>
          </View>
          <View style={styles.moreInfo}>
            <Text style={[styles.information]}>Descrição das áreas comuns:</Text>
            <Text style={styles.information}>{house.rooms_description}</Text>
          </View>
          <View style={styles.moreInfo}>
            <Text style={[styles.information]}>Informações adicionais:</Text>
            <Text style={styles.information}>{house.more_informations}</Text>
          </View>
          <View style={styles.infoTitle}>
            <Text style={[{ textAlign: "center" }, { fontSize: 20 }]}>Contato</Text>
          </View>
          <View style={styles.contact}>
            <Text style={[styles.information]}>{house.phone}</Text>
            <Text style={[styles.information]}>{house.email}</Text>
          </View>

          <View style={styles.caixa}>
            <View style={styles.buttonsBox}>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${house.phone}`)}>
                <View style={styles.button}>
                  <Text style={{ fontSize: 24 }}>Ligar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(`mailto:${house.email}`)}>
                <View style={styles.button}>
                  <Text style={{ fontSize: 24 }}>Mandar e-mail</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.mapBox}>
                <View>
                  <Text style={{ fontSize: 20 }}>Localização</Text>
                </View>
                <MapView
                  style={styles.mapStyle}
                  initialRegion={{
                    latitude: house.maps.latitude,
                    longitude: house.maps.longitude,
                    latitudeDelta: house.maps.latitudeDelta,
                    longitudeDelta: house.maps.longitudeDelta,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: house.maps.latitude,
                      longitude: house.maps.longitude,
                    }}
                    title={house.name}
                    description={house.address}
                  />
                </MapView>
              </View>
            </View>
            <View style={styles.videoBox}>
              <View>
                <Text style={{ fontSize: 20 }}>Detalhes do interior:</Text>
              </View>
              <View style={styles.videos}>
                <YoutubePlayer height={200} play={false} videoId={house.video} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    width: "100%",
    backgroundColor: "#FFF",
  },

  topBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: "3%",
  },
  image: {
    width: Dimensions.get("screen").width,
    height: 250,
  },

  title: {},
  infoBox: {
    padding: "4%",
    backgroundColor: "#DCDCDC",
  },
  infoTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5%",
  },
  information: {
    fontSize: 17,
    margin: "1%",
  },
  infoText: {
    display: "flex",
    flexDirection: "row",
  },
  moreInfo: {
    marginTop: "3%",
    marginBottom: "3%",
  },
  contact: {},
  caixa: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsBox: {
    margin: 20,
    display: "flex",
  },
  button: {
    margin: 200,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#FFF",
  },
  mapBox: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingBottom: 10,
    margin: 5,
    width: 320,
    display: "flex",
    alignItems: "center",
  },
  mapStyle: {
    width: 300,
    height: 200,
  },
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoBox: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 15,
    width: 320,
  },
  videos: {
    width: 320,
    height: 200,
  },
});
