import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import Splash from "./components/Splash";
import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Details";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Favorites from "./screens/Favorites";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <Splash>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#303030",
              },
              headerTitle: "The House",
              headerTitleStyle: {
                color: "white",
              },
              headerTitleAlign: "center",

              tabBarStyle: {
                backgroundColor: "#303030",
              },

              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Inicial") {
                  iconName = "home";
                } else if (route.name === "Favoritos") {
                  iconName = "star";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "white",
              tabBarInactiveTintColor: "gray",
              tabBarItemStyle: {
                padding: 5,
              },
            })}
          >
            <Tab.Screen name="Inicial" component={HomeScreen} />
            <Tab.Screen
              options={{ tabBarItemStyle: { display: "none" } }}
              name="Detalhes"
              component={DetailsScreen}
            />
            <Tab.Screen name="Favoritos" component={Favorites} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Splash>
  );
}
