import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Switch,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorPicker } from "react-native-color-picker";

import { AntDesign } from "@expo/vector-icons";

const Settings = ({ navigation, route }) => {
  const [settings, setsettings] = useState(null);
  const [radius, setradius] = useState(10);
  const [selectedItems, setselectedItems] = useState(["peak", "reservoir"]);
  const [charging, setcharging] = useState(true);
  const [cameraInfo, setcameraInfo] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@Settings", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@Settings");
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData().then((val) => {
      setsettings(val);
      setradius(val.radius);
      setselectedItems(val.selectedItems);
      setcameraInfo(val.cameraInfo);
    });
  }, []);
  const Save = () => {
    if (selectedItems.length == 0)
      Alert.alert(
        "Error when Saving",
        "It's compulsary to select at least one location",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    else {
      storeData({ radius, selectedItems, cameraInfo });
      navigation.goBack();
      console.log("Saved");
    }
  };
  const toggleElem = (e) => {
    if (selectedItems.includes(e)) {
      var arr = selectedItems;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == e) {
          arr.splice(i, 1);
        }
      }
      setselectedItems(arr);
    } else setselectedItems((current) => [...current, e]);
    setcharging(!charging);
  };
  if (settings === null)
    return (
      <ActivityIndicator
        style={{
          textAlign: "center",
          textAlignVertical: "center",
          height: "100%",
        }}
        size={60}
      />
    );
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
            marginTop: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 10,
              width: Dimensions.get("window").width - 10,
              backgroundColor: "#ccc",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                marginRight: 10,
                position: "absolute",
                top: -30,
                left: 10,
                backgroundColor: "#e6e6e6",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                zIndex: -2,
                height: "60%",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                color: "#1fb28a",
              }}
            >
              RADIUS
            </Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                zIndex: 2,
                paddingVertical: 15,
              }}
            >
              <Slider
                step={5}
                minimumValue={5}
                maximumValue={25}
                value={settings.radius}
                style={{ width: "85%" }}
                onValueChange={(slideValue) => setradius(slideValue)}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#b9e4c9"
              />
              <Text>{radius} km</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 10,
              width: Dimensions.get("window").width - 10,
              backgroundColor: "#ccc",
              padding: 10,
              borderRadius: 10,
              marginTop: 40,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                marginRight: 10,
                position: "absolute",
                top: -30,
                left: 10,
                backgroundColor: "#e6e6e6",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                zIndex: -2,
                height: 30,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                color: "#1fb28a",
              }}
            >
              CHOOSE LOCATIONS
            </Text>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                zIndex: 2,
                paddingVertical: 15,
                minWidth: 50,
              }}
            >
              {[
                "peak",
                "reservoir",
                "lake",
                "viewpoint",
                "saddle",
                "waterfall",
                "wilderness hut",
              ].map((value) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                  }}
                >
                  <Text>
                    {value.toUpperCase()}
                    {"   "}
                    <AntDesign
                      name="questioncircleo"
                      size={17}
                      color="black"
                    />{" "}
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#7de8cb" }}
                    thumbColor={
                      selectedItems.includes(value) ? "#1b9876" : "#f4f3f4"
                    }
                    ios_backgroundColor="#3e3e3e"
                    value={selectedItems.includes(value) === true}
                    onValueChange={() => toggleElem(value)}
                  />
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 10,
              width: Dimensions.get("window").width - 10,
              backgroundColor: "#ccc",
              padding: 10,
              borderRadius: 10,
              marginTop: 40,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                marginRight: 10,
                position: "absolute",
                top: -30,
                left: 10,
                backgroundColor: "#e6e6e6",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                zIndex: -2,
                height: 30,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                color: "#1fb28a",
              }}
            >
              OTHER SETTINGS
            </Text>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                zIndex: 2,
                paddingVertical: 15,
                minWidth: 50,
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>CAMERA INFO: </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#7de8cb" }}
                  thumbColor={cameraInfo ? "#1b9876" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  value={cameraInfo}
                  onValueChange={() => setcameraInfo(!cameraInfo)}
                />
              </View>
              <ColorPicker
                onColorSelected={(color) => alert(`Color selected: ${color}`)}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            alignSelf: "flex-end",
            marginBottom: 20,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={Save}>
            <Text
              style={{
                fontSize: 20,
                color: "#0b4133",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                padding: 10,
                paddingHorizontal: 25,
                backgroundColor: "#66e5c3",
                margin: 5,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                padding: 10,
                paddingHorizontal: 25,
                backgroundColor: "#ff5c33",
                margin: 5,
                marginRight: 0,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    marginVertical: 20,
  },
});

export default Settings;
