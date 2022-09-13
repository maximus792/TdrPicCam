import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import TopBar from "./TopBar";

const Index = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.button}>PicCam</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          //navigation.navigate("Home", {allprop:true});
          console.log("Working on");
        }}
      >
        <Text style={styles.buttonDesactivated}>PicCam ALL</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Text style={styles.button}>Settings</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
    paddingBottom: Dimensions.get("window").height / 5,
  },
  title: {
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
  },
  map: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
  },
  headerText: {},
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    textAlign: "center",
    fontSize: 30,
  },
  buttonDesactivated: {
    alignItems: "center",
    backgroundColor: "#8F8F8F91",
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    textAlign: "center",
    fontSize: 30,
  },
  NamesText: {
    height: "auto",
    width: "auto",
    textAlignVertical: "center",
    fontSize: 15,
  },
});

export default Index;
