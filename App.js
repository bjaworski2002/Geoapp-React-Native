import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Main from "./components/Main";
import List from "./components/List";
import ItemMap from "./components/ItemMap";
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="main" component={Main} options={{headerShown: false}}/>
          <Stack.Screen name="list" component={List} options={{headerShown: false}}/>
          <Stack.Screen name="itemmap" component={ItemMap}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
const options = {
  headerStyle: {
    backgroundColor: 'green',
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
