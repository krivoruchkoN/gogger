import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { UrlTile, MapEvent } from 'react-native-maps';

interface GeocoderResponse {
  place_id: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  address: {
    city: string;
    state_district: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
}

// eslint-disable-next-line no-template-curly-in-string
const tilesUrl = 'https://tile.openstreetmap.org/${z}/${x}/${y}.png';
// const tilesUrl = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png';

const sleep = async (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const reverseGeocoderCall = async (lat: number, lon: number) => {
  console.log('reverseGeocoderCall');
  await sleep(500);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`,
  );
  const data: GeocoderResponse = await response.json();
  console.log(data);
  return data;
};

const Map = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    }}
  >
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={(event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        reverseGeocoderCall(latitude, longitude);
      }}
    >
      <UrlTile urlTemplate={tilesUrl} maximumZ={19} flipY={false} />
    </MapView>
  </View>
);

export default Map;
