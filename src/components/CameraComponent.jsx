import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Camera, CameraType } from "expo-camera";
import Info from "./Info";
import Names from "./Names";

const CameraComponent = ({
  latitude,
  longitude,
  altitude,
  angle,
  navigation,
  allprop
}) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [all, setAll] = useState(allprop);
  const [radius, setRadius] = useState(15);
  const [loaded, setloaded] = useState(false);


  
  useEffect(() => {
    navigation.addListener("focus", () => {
      setloaded(true);
    });
    navigation.addListener("blur", () => {
      setloaded(false);
    });


  }, []);

  if (!permission) {
    // Camera permissions are still loading
    
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loaded && (
        <Camera style={styles.camera} type={CameraType.back} ratio="16:9">
          <View style={styles.mainContainer}>
            <View style={styles.TopBar}>
              
              <Info
                {...{
                  latitude,
                  longitude,
                  altitude,
                  angle,
                  styles: styles.Info,
                  radius,
                }}
              />
            </View>
            <View>
              <Names
                {...{
                  latitude,
                  longitude,
                  altitude,
                  angle,
                  styles: styles.Names,
                  NamesAll: styles.NamesAll,
                  all,
                  radius,
                  NamesText: styles.NamesText,
                  NamesBox: styles.NamesBox,
                  navigation,
                }}
              />
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    /*  backgroundColor: "red", */
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  TopBar: {
    /* backgroundColor: "green", */
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "absolute",
    top: -30,
    right: -30,
  },

  Info: {
    marginTop: Constants.statusBarHeight + 15,
    marginLeft: 15,
    padding: 10,
    backgroundColor: "transparent",
    height: 150,
    width: 200,
  },
  Names: {
    flexDirection: "row",
    width: "auto",
    height: Dimensions.get("window").height / 4,
    overflow: "hidden",
    flexWrap: "nowrap",
    margin: 10,
    backgroundColor: "transparent",
  },
  NamesAll: {
    width: Dimensions.get("window").width - 20,
    height: "auto",
    flexDirection: "column",
    overflow: "hidden",
    flexWrap: "wrap",
    margin: 10,
    marginBottom: 0,
    paddingTop: 20,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  NamesText: {
    height: "auto",
    width: "auto",
    textAlignVertical: "center",
    fontSize: 15,
  },
  NamesBox: {
    width: Dimensions.get("window").width - 40,
    margin: 10,
    backgroundColor: "#fff",
    height: Dimensions.get("window").height / 4 - 20,
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  input: {
    width: 160,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    color: "black",
    fontSize: 15,
  },
});

export default CameraComponent;
