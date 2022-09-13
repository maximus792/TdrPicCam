import * as Location from 'expo-location';


const getLocation = async () => {
  errorMessage = "";
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }

  var location = await Location.getCurrentPositionAsync({});

  return location;
};

export default getLocation;