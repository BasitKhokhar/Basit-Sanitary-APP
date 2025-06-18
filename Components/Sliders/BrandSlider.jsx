import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL || "";
const { width } = Dimensions.get("window");
const itemWidth = width / 3 - 20;

const BrandSlider = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/brands`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setBrands(data.filter(item => item?.id && item?.image_url));
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />;
  }

  return (
    <LinearGradient
      colors={["#001F3F", "#003366", "#004C99"]}
      start={{ x: -0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Our Brands</Text>
        <FlatList
          data={brands}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <View style={styles.brandItem}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.brandImage}
                resizeMode="cover"
                onError={(e) => console.log("Image failed to load:", e.nativeEvent.error)}
              />
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: "#fff", textAlign: "center" }}>No brands available</Text>}
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
