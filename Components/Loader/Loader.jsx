import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';


function Loader() {
  return (
     <View style={styles.container}>
      <LottieView
        source={require('../../assets/loader.json')} // Replace with your own file
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Loader
