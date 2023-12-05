import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

import Imagens from './telas/Cesta';
import SobreNos from './telas/SobreNos';
import MinhaCesta from './telas/MinhaCesta/MinhaCesta';
import Produtos from './telas/Produtos/ListaDeProd';
import Cadastro from './telas/Login/Cadastro';
import Login from './telas/Login/Login';

const Tab = createBottomTabNavigator();

function TabsMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#660066",
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused
              ? 'paw'
              : 'paw-outline';
          } else if (route.name === 'Sobre nós') {
            iconName = focused
              ? 'book'
              : 'book-outline';
          } else if (route.name === 'Produtos') {
            iconName = focused
              ? 'grid'
              : 'grid-outline';
          } else if (route.name === 'Minha cesta') {
            iconName = focused
              ? 'cart'
              : 'cart-outline';
          } else if (route.name === 'Login') {
            iconName = focused
              ? 'menu'
              : 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'pink',
      })}
    >
      <Tab.Screen name="Inicio" component={Imagens} />
      <Tab.Screen name="Sobre nós" component={SobreNos} />
      <Tab.Screen name="Produtos" component={Produtos} />
      <Tab.Screen name="Minha cesta" component={MinhaCesta} options={{unmountOnBlur: true}}/>
      <Tab.Screen options={{tabBarItemStyle: {display:'none'}}} name="Cadastro" component={Cadastro} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}

export default function App() {
  //Fonte utilizada para o projeto
  const [fonteCarregada] = useFonts({
    "MontSerratRegular": Montserrat_400Regular,
    "MontSerratBold": Montserrat_700Bold,
  });

  //Checa se as fontes já foram carregadas antes de exibir no APP
  if (!fonteCarregada) {
    return <View />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#FFF" translucent={true} />
      <TabsMenu />
    </NavigationContainer>
  );
}