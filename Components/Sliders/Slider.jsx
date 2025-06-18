import React, { useEffect, useState, useRef } from "react";
import {
  View, Image, ActivityIndicator, StyleSheet, FlatList, Dimensions, Text
} from "react-native";
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const { width } = Dimensions.get("window");

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const indexRef = useRef(0); // To hold the actual index
  const intervalRef = useRef(null); // To hold the interval ID

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/sliderimages`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.warn("Unexpected slider image data:", data);
        }
      } catch (error) {
        console.error("Error fetching slider images:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    intervalRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: indexRef.current, animated: true });
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [images]);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image
        source={{ uri: item.sliderimage_url }}
        style={styles.image}
        onError={() => console.warn("Failed to load image:", item.sliderimage_url)}
      />
    </View>
  );

  // if (loading) {
  //   return (
  //     <View style={styles.loader}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  if (images.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>No images to display</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        onScrollToIndexFailed={({ index }) => {
          console.warn(`Scroll to index ${index} failed`);
        }}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View key={index} style={[styles.dot, indexRef.current === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#F8F9FA"
  },
  loader: {
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: width * 0.9,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    backgroundColor: "#e0e0e0"
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 5,
    alignSelf: "center"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#bbb",
    marginHorizontal: 5
  },
  activeDot: {
    backgroundColor: "white",
    width: 10,
    height: 10
  }
});

export default ImageSlider;
