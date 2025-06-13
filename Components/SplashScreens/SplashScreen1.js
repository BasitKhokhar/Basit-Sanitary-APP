import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const SplashScreen1 = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchSplashImage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/splash-image`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setImageUrl(data[0].image_url); // Assuming `image_url` is the correct column name
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching splash image:", error);
      }
    };

    fetchSplashImage();
  }, []);

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Animatable.Image
          animation="zoomIn"
          duration={1500}
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});

export default SplashScreen1;
