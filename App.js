import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home.js'
import InfosFazenda from "./Screens/InfosFazenda.js";
import InfosPontos from "./Screens/InfosPontos.js";
import DownloadArquivo from './Screens/DownloadArquivo.js'

const Stack = createNativeStackNavigator();

class App extends React.Component {
  
  render() {
    return (
      <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{gestureEnabled:false, detachPreviousScreen:false, headerLeft:null, headerShown:false}}/>
      <Stack.Screen name="InfosFazenda" component={InfosFazenda} options={{gestureEnabled:false, detachPreviousScreen:false, headerLeft:null, headerShown:false}}/>
      <Stack.Screen name="InfosPontos" component={InfosPontos} options={{gestureEnabled:false, detachPreviousScreen:false, headerLeft:null, headerShown:false}}/>
      <Stack.Screen name="DownloadArquivo" component={DownloadArquivo} options={{gestureEnabled:false, detachPreviousScreen:false, headerLeft:null, headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
    );
  }
}

export default App;