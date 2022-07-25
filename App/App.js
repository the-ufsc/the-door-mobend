import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import Splash from "./components/Splash";
import HomeScreen from "./screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AddScreen from "./screens/AddDoor";
import EditScreen from "./screens/editDoor";

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
              headerTitle: "The Door",
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
            <Tab.Screen name="Adicionar" component={AddScreen} />
            <Tab.Screen name="Edit" component={EditScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Splash>
  );
}
