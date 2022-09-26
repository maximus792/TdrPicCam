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
import theme from "../theme";
import { Magnetometer } from "expo-sensors";

import getLocation from "../Location";
import Camera from "./CameraComponent";
import TopBar from "./TopBar";
import LPF from "lpf/lib/LPF";

const MainScreen = ({ navigation }) => {
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [altitude, setAltitude] = useState();
  const [all, setall] = useState(false);
  const [angle, setangle] = useState(0);
  const [settings, setsettings] = useState();

  var angleDef = 0;
  Magnetometer.setUpdateInterval(60);
  useEffect(() => {
    Magnetometer.addListener((result) => {
      var a = 0;
      if (Math.atan2(result.z, result.x) >= 0) {
        a = Math.abs(
          270 - Math.round(Math.atan2(result.z, result.x) * (180 / Math.PI))
        );
      } else {
        a = Math.abs(
          270 -
            Math.round(
              (Math.atan2(result.z, result.x) + 2 * Math.PI) * (180 / Math.PI)
            )
        );
      }
      
      if (Math.abs(angleDef - a) >= 4) {
        angleDef = a;
        setangle(angleDef);
      }
    });

    getLocation().then((location) => {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setAltitude(location.coords.altitude);
    });
  }, []);


  return (
    <View style={styles.container}>
      <Camera
        {...{ latitude, longitude, altitude, angle, navigation, allprop: all }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: theme.colors.bgcolor,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});

export default MainScreen;
