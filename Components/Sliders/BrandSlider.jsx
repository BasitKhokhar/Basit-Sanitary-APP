import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, FlatList, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const { width } = Dimensions.get("window");
const itemWidth = width / 3 - 20; // Adjust width for 3 columns with spacing

const BrandSlider = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/brands`) // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        setBrands(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />;
  }

  return (
    <LinearGradient colors={["#001F3F", "#003366", "#004C99"]}  start={{ x: -0.2, y: 0 }}  // Slightly rotated horizontally
    end={{ x: 1, y: 1 }} >
      <View style={styles.container}>
        <Text style={styles.title}>Our Brands</Text>
        <FlatList
          data={brands}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // Display 3 columns
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <View style={styles.brandItem}>
              <Image source={{ uri: item.image_url }} style={styles.brandImage} resizeMode="cover" />
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
   
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    paddingBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  brandItem: {
    width: itemWidth,
    alignItems: "center",
  },
  brandImage: {
    width: itemWidth,
    height: 70,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "black",
  },
});

export default BrandSlider;
