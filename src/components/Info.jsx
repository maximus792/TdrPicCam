import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";


const Info = ({styles, angle, latitude,longitude,altitude,radius}) => {
 
  return (
    <View style={styles}>
      <Text>Latitude: {latitude === undefined ? "..." : latitude}</Text>
      <Text>Longitude: {longitude === undefined ? "..." : longitude}</Text>
      <Text>
        Altitude: {altitude === undefined ? "..." : parseInt(altitude) + " m"}
      </Text>
      <Text>ANGLE: {parseInt(angle)}</Text>
      <Text>Radius: {parseInt(radius)}</Text>
    </View>
  );
};



export default Info;
