import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import TopBar from "./TopBar";

import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";

const MoreInfo = ({ navigation, route }) => {
  /* https://commons.wikimedia.org/w/api.php?action=query&titles=Image:Castell d'almenar&prop=imageinfo&format=json */

  const [value, setvalue] = useState(route.params.value);
  const [data, setData] = useState();
  const [description, setDescription] = useState();
  const [charged, setcharged] = useState(false);

  const image = (id) => {
    fetch(
      `https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P18&entity=${id}&format=json`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.claims[0]) {
          setData(json.claims.P18[0].mainsnak.datavalue.value);
        }
      });
  };

  const getDescription = (title) => {
    var info = title.split(":");
    fetch(
      `https://${info[0]}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${info[1]}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.query) {
          var Key = Object.keys(json.query.pages)[0];
          var desc = json.query.pages[Key].extract;
          var replaced = desc
            .replace("<p>", "")
            .replace("</p>", "")
            .replace("<b>", "")
            .replace("</b>", "")
            .replace("<h2>", "")
            .replace("</h2>", "")
            .replace("<span>", "")
            .replace("</span>", "");
          if(replaced[0] === "<" && replaced[1] === "!" && replaced[2] === "-" && replaced[3] === "-")
            {setDescription(null);
              setcharged(true)
            return 0;}

          var write = true;
          var span = false;
          var final = "";
          for (let i = 0; i < replaced.length; i++) {
            //if (replaced[i] === "<" && replaced[i + 1] === "s") write = false;
            if (replaced[i] === "<" || (replaced[i] === "(") && replaced[i+1] === "<") {write = false; if(replaced[i+1]==="s" || replaced[i+1] === "i") span = true}
            if (write) final += replaced[i];
            if (replaced[i] === ">" && !span) {write = true; if(replaced[i-1]==="n" || replaced[i-1] === "i") span = false}
          }

          setDescription(final);
          setcharged(true);
        } else {
          setcharged(true);
        }
      })
      .catch((e) => {
        setcharged(true);
      });
  };
  const getType = (tags)=>{
    if(tags.natural === "peak")
      return (<FontAwesome5 name="mountain" size={20} color="black" />)
  }
  const createWiki = (name) => {
    /* https://ca.wikipedia.org/w/index.php?title=Serra_del_trib%C3%B3&action=edit&redlink=1 */
    return `https://ca.wikipedia.org/w/index.php?title=${name.replace(
      " ",
      "_"
    )}&action=edit&redlink=1`;
  };
  useEffect(() => {
    if (value.tags.wikidata !== undefined) {
      console.log(value.tags.wikidata);
      image(value.tags.wikidata);
      getDescription(value.tags.wikipedia);
    } else {
      setcharged(true);
      console.log(charged);
    }
  }, []);

  if (!charged)
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
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Image
          style={[{ width: 100, height: 100, borderRadius: 100 / 2 },data?{}:{display:"none"}]}
          source={
            data
              ? {
                  uri: `https://commons.wikimedia.org/w/thumb.php?width=500&f=${data}`,
                }
              : {
                  uri: `https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=`,
                }
          }
        />
        <Text style={styles.title}>{getType(value.tags)}{" "}{value.tags.name}</Text>
      </View>

      <ScrollView style={{width:"100%"}}>
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          
          
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 10,
              width: Dimensions.get("window").width - 10,
              backgroundColor: "#ccc",
              borderRadius: 10,
              marginTop: 60,
              alignSelf:"center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginRight: 10,
                position: "absolute",
                top: -35,
                left: 10,
                backgroundColor: "#e6e6e6",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                zIndex: -2,
                height: 35,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                color: "#1fb28a",
              }}
            >
              INFO
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
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.NamesText, { padding: 10, marginTop: 10 }]}>
            <Ionicons name="ios-compass" size={22} color="#424242" />{" "}
            {value.lat}, {value.lon}
          </Text>
          <Text style={[{ padding: 10 }, styles.NamesText]}>
          <FontAwesome5 name="arrow-up" size={20} color="black" />{" "}
            {value.tags.ele} m
          </Text>
          
          <Text style={[{ padding: 10 }, styles.NamesText]}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={22}
              color="#424242"
            />{" "}
            {value.distance.toFixed(2)} km
          </Text>
              </View>

              

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
              alignSelf:"center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginRight: 10,
                position: "absolute",
                top: -35,
                left: 10,
                backgroundColor: "#e6e6e6",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                zIndex: -2,
                height: 35,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                color: "#1fb28a",
              }}
            >
              About
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
                {description ? (
            <Text style={[{ padding: 0 }, styles.NamesText]}>
              {description}
            </Text>
          ) : (
            <View>
              <Text style={[{ padding: 10 }, styles.NamesText]}>
                No description found. Contribute in:
              </Text>
              <Text
                onPress={() => {
                  console.log("hsd");
                  Linking.openURL(createWiki(value.tags.name));
                }}
                style={{ color: "blue", margin: 10 }}
              >
                {" "}
                {createWiki(value.tags.name)}
              </Text>
            </View>
          )}
              </View>

              

            </View>
          </View>
          
        </View>

        <View style={{marginTop:20}}>
        <Text
              style={{
                fontSize: 20,
                marginRight: 10,
                position: "absolute",
                top: -15,
                left: 15,
                backgroundColor: "#e6e6e6",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                zIndex: -2,
                height: 35,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                color: "#1fb28a",
              }}
            >
              MAP
            </Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: value.lat,
            longitude: value.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      pitchEnabled={true}
      rotateEnabled={true}
      scrollEnabled={true}
        >
          <Marker
            coordinate={{ latitude: value.lat, longitude: value.lon }}
            title={value.tags.name}
          />
        </MapView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: theme.colors.bgcolor,
  },
  title: {
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
  },
  map: {
    //width: Dimensions.get("window").width -15,
    //height: Dimensions.get("window").width -15,
    width: Dimensions.get("window").width -20,
    height: Dimensions.get("window").width /2 + 70,
    borderRadius: 10,
    margin: 15,
    alignSelf: "center"
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
  },
  NamesText: {
    height: "auto",
    width: "auto",
    textAlignVertical: "center",
    fontSize: 15,
  },
});

export default MoreInfo;
