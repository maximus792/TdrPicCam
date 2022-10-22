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
  Pressable,
} from "react-native";
import Slider from "@react-native-community/slider";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import theme from "../theme";

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
  const restoreData = async () => {
    try {
      await AsyncStorage.removeItem("@data");
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
      storeData({ radius: 15, selectedItems: ["peak"], cameraInfo: false });
    }
  };

  /*   useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Pressable  onPress={Save} style={{justifyContent:"center",alignItems:"center"}} >
          <FontAwesome name="save" size={26} color="#eeeeee" />
        </Pressable>
      ),
    });
  }, [navigation]); */

  useEffect(() => {
    getData().then((val) => {
      setsettings(val);
      setradius(val.radius);
      setselectedItems(val.selectedItems);
      setcameraInfo(val.cameraInfo);
    });
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            Save();
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <FontAwesome name="save" size={26} color="#eeeeee" />
        </Pressable>
      ),
    });
  }, [navigation,radius, selectedItems, cameraInfo]);

  const Save = () => {
    console.log(radius);
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
      restoreData().then(() => {
        navigation.goBack();
      });
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
                maximumValue={200}
                value={settings.radius}
                style={{ width: "85%" }}
                onValueChange={(slideValue) => setradius(slideValue)}
                minimumTrackTintColor="#9dccaf"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#1fb28a"
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
              ].map((value, key) => (
                <View
                  key={key}
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
                <Text>CAMERA INFO </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#7de8cb" }}
                  thumbColor={cameraInfo ? "#1b9876" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  value={cameraInfo}
                  onValueChange={() => setcameraInfo(!cameraInfo)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text>BACKGROUND COLOR </Text>
                <View
                  style={{
                    width: 20,
                    height: 30,
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    backgroundColor: theme.colors.bgcolor,
                  }}
                ></View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text>NAVBAR COLOR </Text>
                <View
                  style={{
                    width: 20,
                    height: 30,
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    backgroundColor: theme.colors.header,
                  }}
                ></View>
              </View>
            </View>
          </View>
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
