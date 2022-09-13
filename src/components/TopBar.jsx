import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";

import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";

const TopBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>PicsCam</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="md-reload" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Settings", { hi: "hi" });
          }}
        >
          <MaterialIcons name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#788585",
  },
  button: {
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 24,
    marginLeft: 10,
  },
});

export default TopBar;
