import { Gyroscope } from 'expo-sensors';


export default function getGyroscope(){
    Gyroscope.setUpdateInterval(30);
    Gyroscope.addListener(gyroscopeData => {
        return gyroscopeData;
      })
}