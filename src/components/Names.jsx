import React, {useEffect} from "react";
import {
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  FlatList,
  VirtualizedList,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Provider from "../Provider";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

class Names extends React.Component {
  state = {
    data: null,
    angle: this.props.angle,
    all: this.props.all,
    radius: 15,
    charged: false,
    show: false,
    errorCount: 0,
    selectedItems : []
  };
  componentDidMount() {
    this.setState({ errorCount: 0 });
    this.loadData();
    this.getData().then((val) => {
      this.setState({radius:(parseInt(val.radius)), selectedItems:(val.selectedItems)})
    })
  }
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@Settings");
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  loadData() {
    if (!this.state.charged && !this.state.data)
      Provider(this.props.latitude, this.props.longitude, this.state.radius, this.state.selectedItems)
        .then((data) => {
          data.elements.map((value, index) => {
            data.elements[index].angle = this.angleWithMountain(
              value.lat,
              value.lon
            );
            data.elements[index].distance = this.getDistanceFromLatLonInKm(
              this.props.latitude,
              this.props.longitude,
              value.lat,
              value.lon
            );
            data.elements[index].angleWithMountainElevation =
              this.angleWithMountainElevation(value.tags.ele, value.distance);
          });
          this.setState({ data: data, charged: true });
        })
        .catch((e) => {
          console.log(e);
          this.setState({ errorCount: this.state.errorCount++ });
          if (this.state.errorCount >= 1)
            Alert.alert(
              "Error when fetching Data",
              "Please if error continues restart the app or connect to the internet",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Retry",
                  onPress: () => {
                    this.setState({ errorCount: 0 });
                    this.loadData();
                  },
                },
              ]
            );
          else this.loadData();
        });
  }
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // this.deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  angleWithMountainElevation(ele, dist) {
    var y = Math.abs(ele - this.props.altitude);
    var x = dist * 1000;
    if (Math.atan2(y, x) >= 0) {
      return Math.atan2(y, x) * (180 / Math.PI) * 100;
    } else {
      return (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI) * 100;
    }
  }

  angleWithMountain(lat, lon) {
    const x = lat - this.props.latitude;
    const y = lon - this.props.longitude;

    if (Math.atan2(y, x) >= 0) {
      return Math.atan2(y, x) * (180 / Math.PI);
    } else {
      return (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
  }

  calcView() {
    var angleOfVision = 10;
    var angle = this.props.angle
    //if (this.state.radius > 10 && this.state.radius <= 20) angleOfVision = 15;
    /* if (Math.abs(this.props.angle - this.state.angle) >= 4)
      this.setState({ angle: this.props.angle }); */
    var items = [];
    this.state.data.elements.map((value) => {
      if (!value.tags.name || value.distance > this.state.radius) return;
      if (
        Math.abs(angle - value.angle) < angleOfVision ||
        this.state.all
      )
        items.push(value);
    });
    return items ;
  }
  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  render() {
    
    if (!this.state.charged) {
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
    }
    if (this.props.radius != this.state.radius) {
      this.setState({ radius: this.props.radius, charged: false });
      this.loadData();
    }
    return (
      <SafeAreaView
        style={this.state.all ? { paddingBottom: 0 } : { paddingBottom: 5 }}
      >
        <VirtualizedList
          style={this.state.all ? this.props.NamesAll : this.props.styles}
          horizontal={!this.state.all}
          pagingEnabled={!this.state.all}
          getItemCount={() => this.calcView().length}
          getItem={(data, index) => {
            return data[index];
          }}
          data={this.calcView().sort(this.dynamicSort("distance"))}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                this.props.navigation.push("MoreInfo", { value: item });
              }}
            >
              <View style={this.props.NamesBox}>
                <Text style={styles.title}>
                  <FontAwesome5 name="mountain" size={20} color="#424242" />{" "}
                  {item.tags.name}
                </Text>

                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Text
                    style={[
                      this.props.NamesText,
                      { padding: 10, marginTop: 10 },
                    ]}
                  >
                    <Ionicons name="ios-compass" size={22} color="#424242" />{" "}
                    {item.lat}, {item.lon}
                  </Text>
                  <Text style={[{ padding: 10 }, this.props.NamesText]}>
                    <FontAwesome5 name="arrow-up" size={20} color="black" />{" "}
                    {item.tags.ele}m
                  </Text>
                  <Text style={[{ padding: 10 }, this.props.NamesText]}>
                    <MaterialCommunityIcons
                      name="map-marker-distance"
                      size={22}
                      color="#424242"
                    />{" "}
                    {item.distance.toFixed(2)}km
                  </Text>
                </View>
                {this.state.all ? (
                  ""
                ) : (
                  <Text
                    style={[
                      styles.mark,
                      this.calcView().length <= 1 ? { display: "none" } : "",
                    ]}
                  >
                    {index + 1}/{this.calcView().length}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    position: "absolute",
    left: 15,
    top: 10,
    fontSize: 20,
  },
  mark: {
    fontSize: 20,
    position: "absolute",
    bottom: 0,
    right: 5,
    margin: 10,
  },
  pointDown: {
    position: "relative",
    marginBottom: 10,
    fontSize: 35,
    color: "#dbdbdb",
    left: Dimensions.get("screen").width / 2 - 10,
    bottom: -20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginVertical: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default Names;

/* <View>
          <View style={{ flexDirection: "row", justifyContent: "center", margin: 10, }}>
            <TextInput
              style={styles.input}
              value={this.state.radius}
              onChangeText={(v)=>{this.setState({radius:v})}}
              placeholder="Radi, defecte: 10"
              keyboardType="numeric"
            ></TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.loadData();
              }}
            >
              <Text>Change</Text>
            </TouchableOpacity>
            
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ all: !this.state.all });
            }}
          >
            <Text>Show all</Text>
          </TouchableOpacity>
        </View> 
        
        
        
        
        
        
        
        
        {this.state.data.elements.map((value, index) => {
            var distance = this.getDistanceFromLatLonInKm(
              this.props.latitude,
              this.props.longitude,
              value.lat,
              value.lon
            );
            var angleWithMountainElevation = this.angleWithMountainElevation(
              value.tags.ele,
              distance
            );

            if (
              !value.tags.name ||
              this.getDistanceFromLatLonInKm(
                this.props.latitude,
                this.props.longitude,
                value.lat,
                value.lon
              ) > this.state.radius
            )
              return;
            if (Math.abs(this.props.angle - value.angle) < 15 || this.state.all)
              return (
                <Text style={this.props.NamesText} key={index}>
                  Name: {value.tags.name}, lat: {value.lat}, lon: {value.lon},
                  elevation: {value.tags.ele}m, angle With Mountain:
                  {parseInt(value.angle)}, Distance: {distance.toFixed(2)}km,
                  angleWithMountainElevation:{" "}
                  {angleWithMountainElevation.toFixed(2)}
                </Text>
              );
          })}*/
