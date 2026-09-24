import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Introducao from "./components/Introducao";
import Jogo from "./components/Jogo";
import Criadores from "./components/Criadores";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1a102f' },
          headerTintColor: '#fff',
          tabBarStyle: { backgroundColor: '#1a102f', borderTopColor: '#331e54' },
          tabBarActiveTintColor: '#ffb703',
          tabBarInactiveTintColor: '#8a71b3',
        }}
      >
        <Tab.Screen
          name="Início"
          component={Introducao}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Jogo"
          component={Jogo}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="sparkles-outline" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Criadores"
          component={Criadores}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" color={color} size={size} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}