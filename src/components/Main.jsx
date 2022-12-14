import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { MagnetometerUncalibrated } from "expo-sensors";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./MainScreen";
import Settings from "./Settings";
import MoreInfo from "./MoreInfo";
import Index from "./Index";

import { MaterialIcons,Ionicons  } from "@expo/vector-icons";

const Main = () => {
 
  const Stack = createNativeStackNavigator();
  //RENDERER
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerStyle: {
        backgroundColor: theme.colors.header,
        color: "#fff"
      },headerTintColor:"#fff"}}>
      <Stack.Screen
          name="Index"
          component={Index}
          options={{
            headerShown: false,
            unmountOnBlur: true,
            headerTitle: "PicCam",
          }}
        />
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={({navigation})=>({
            unmountOnBlur: true,
            headerTitle: "PicCam",
            
            headerLargeTitle: true,
            headerRight: () => (
              <View style={{flexDirection:"row"}}>
                <TouchableOpacity
                onPress={() => navigation.navigate("Index",{reload: true})}
                color="#fff"
                style={{marginHorizontal:10}}
              ><Ionicons name="ios-reload" size={24} color="#eeeeee" /></TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("Settings",{hi:"hi"})}
                color="#fff"
                style={{marginHorizontal:10}}
              ><MaterialIcons name="settings" size={24} color="#eeeeee" /></TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={({navigation})=>({
            unmountOnBlur: true,
            headerTitle: "Settings",
            headerLargeTitle: true,

            headerRight: () => (
              <Pressable title="Save" />
            ),
           
          })}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfo}
          options={({navigation})=>({
            unmountOnBlur: true,
            headerTitle: "PicCam",
            headerLargeTitle: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Settings",{hi:"hi"})}
                color="#fff"
              ><MaterialIcons name="settings" size={24} color="#eeeeee" /></TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
/* <View style={styles.container}>
            <TopBar />
            <Camera {...{ latitude, longitude, altitude, angle }} />
          </View> */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgcolor,
  },
  input: {
    marginTop: 10,
    padding: 20,
    backgroundColor: theme.colors.dark,
    color: "#fff",
  },
});

export default Main;
