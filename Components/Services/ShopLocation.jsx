import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ShopLocation = () => {
  const shopLatitude = 32.063720; // Replace with your shop's latitude
  const shopLongitude = 72.693895; // Replace with your shop's longitude

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Our Shop Location</Text> */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: shopLatitude,
          longitude: shopLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: shopLatitude, longitude: shopLongitude }}
          title="Basit Sanitary"
          description="Visit us here!"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    // marginHorizontal:20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: '#1A1A1A',
    // borderRadius:10
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginBottom: 10,
  },
  map: {
    flex: 1,
    alignSelf:'center',
    width:'90%',
    height: 300,
    borderRadius:10,marginBottom:20
  },
});

export default ShopLocation;
