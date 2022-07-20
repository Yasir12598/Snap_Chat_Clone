import React from 'react'
import {View, StyleSheet} from 'react-native';
import Camera from './src/screens/Camera';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraRoll from './src/screens/CameraRoll';

const Stack = createNativeStackNavigator();

export default function App(props){
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:false,
        }}
      >
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Gallary" component={CameraRoll} />
      </Stack.Navigator>
    </NavigationContainer>
    // <CameraRoll/>
  );
}

const styles = StyleSheet.create({
   container: {}
});