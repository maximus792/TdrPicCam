import React, { useEffect, useState, useCallback } from "react";
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
  ImageBackground,
} from "react-native";

import Constants from "expo-constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const Index = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    "Trispace-Medium": require("../../assets/fonts/Trispace-Medium.ttf"),
    "Trispace-SemiBold": require("../../assets/fonts/Trispace-SemiBold.ttf"),
  });
  const restoreData = async () => {
    try {
      await AsyncStorage.removeItem("@data");
    } catch (e) {
      // saving error
    }
  };
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  restoreData().then(() => {
    if (route.params?.reload) navigation.navigate("Home");
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background.jpg")}
        style={styles.image}
      >
        {/* <Text style={{
          fontSize: 40,
          position: "absolute",
          top: Constants.statusBarHeight +10,
          color:"white",
          alignSelf: "center"
        }}>PicCam Application</Text> */}
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: Constants.statusBarHeight - 20,
            alignSelf: "center",
          }}
        >
          {/* <Image
            source={require("../images/title.png")}
            style={{
              resizeMode: "contain",
              width: Dimensions.get("window").width - 20,
              alignSelf: "center",
            }}
          ></Image> */}
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            restoreData().then(() => {
              navigation.navigate("Home");
            });
          }}
        >
          <View
            style={{
              position: "absolute",
              left: Dimensions.get("window").width / 2 - 20,
              top: Dimensions.get("window").height / 3 +10,
              alignItems: "center",
            }}
          >
            {/* <Text
              style={{
                fontSize: 30,
                color: "rgba(0,0,0,1)",
                fontFamily: "Trispace-SemiBold",
              }}
            ><Entypo name="camera" size={35} color="black" /> 
              START
            </Text> */}
            <FontAwesome5 name="map-marker-alt" size={50} color="rgba(0,0,0,.5)" />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            position: "absolute",
            bottom: 40,
            //backgroundColor: "red",
            height: Dimensions.get("window").height / 5,
            width: Dimensions.get("window").width,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Home");
          }}>
          <View
            style={{
              //backgroundColor: "rgba(255, 255, 255, 0.4)",
              padding: 10,
              paddingVertical: 15,
              borderRadius: 10,
              width: Dimensions.get("window").width / 1.2,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="search-location" size={40} color="white" />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 27,
                color: "#fff",
                fontFamily: "Trispace-Medium",
              }}
            >
              PicCam 
            </Text>
          </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <View
              style={{
                //backgroundColor: "rgba(255, 255, 255, 0.4)",
                padding: 15,
                borderRadius: 10,
                width: Dimensions.get("window").width / 1.2,
                flexDirection: "row",
              }}
            >
              <MaterialIcons name="settings" size={40} color="white" />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 30,
                  color: "#fff",
                  fontFamily: "Trispace-Medium",
                }}
              >
                Settings
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{ display: "none" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              restoreData().then(() => {
                navigation.navigate("Home");
              });
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
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
