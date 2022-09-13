import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import Constants from "expo-constants";


const Settings = ({ navigation,route }) => {

  return (
    <View style={styles.container}>
          <Text style={[{fontSize:30,},styles.text]}>Working on...</Text>
          <Text>{(route.params) ? (route.params.hi) : "BYE"}</Text>
         
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 5,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems:"center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  text:{
marginVertical: 20,

  }
});

export default Settings;
