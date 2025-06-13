import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Modal, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import OnSaleProducts from "./Products/OnSaleProducts";
import Completesets from "./Products/Completesets";
import TrendingProducts from "./Products/TrendingProducts";
import ShopLocation from "./Services/ShopLocation";
import Categories from "./Categories/Categories";
import ImageSlider from "./Sliders/Slider";
import UserNameDisplay from "./User/UserNameDisplay";
import BrandSlider from "./Sliders/BrandSlider";
import CustomerSupportoptions from "./User/CustomerSupportoptions";
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const API_URL = `${API_BASE_URL}/api/sale-image`; // Replace with your backend IP

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }

    // Fetch image from backend
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setLoading(false);
      });

    // Countdown Timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setShowCloseButton(true); // Show close button after countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigation]);

  const sections = [
    { key: "UserName", component: (
      <View style={{ alignItems: "flex-start" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          <UserNameDisplay />
        </Text>
      </View>
    ) },
    { key: "Slider", component: (
      <View style={{ marginTop: 15 }}> 
        <ImageSlider />
      </View>
    ) },
    { key: "products", component: <Categories /> },
    { key: "onsale", component: <OnSaleProducts /> },
    { key: "brands", component: <BrandSlider /> },
    { key: "sets", component: (
      <View style={{ alignItems: "" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold",textAlign:'center',marginTop:20 }}>
         Trending Products
        </Text>
        <Completesets/>
      </View>
    ) },
    { key: "trending", component: (
      <View style={styles.trendingContainer}>
        <TrendingProducts />
      </View>
    ) },
    { key: "Shoplocation", component: <ShopLocation /> },
    
    { key: "CustomerSupportoptions", component: <CustomerSupportoptions /> },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Modal for Image Display */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Countdown Timer or Close Button */}
            <View style={styles.topRight}>
              {!showCloseButton ? (
                <Text style={styles.countdownText}>{countdown}</Text>
              ) : (
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeText}>✖</Text>
                </TouchableOpacity>
              )}
            </View>
            {/* Loading Indicator */}
            {loading ? (
              <ActivityIndicator size="large" color="#FF4500" />
            ) : imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.modalImage} />
            ) : (
              <Text>No Image Available</Text>
            )}
          </View>
        </View>
      </Modal>

      {/* Home Screen Content */}
      <FlatList
        data={sections}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height:'60%',
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    // padding: 15,
    position: "relative",
  },
  modalImage: {
    // position: "absolute",
    // top: 10,
    width: "100%",
    height: '100%',
    resizeMode:'stretch',
    borderRadius: 10,
  },
  topRight: {
    position: "absolute",
    top: -15,
    right: -10,
    zIndex:10
  },
  countdownText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF4500",
  },
  closeButton: {
    backgroundColor: "#FF6347",
    borderRadius: '50%',
    // width: 30,
    // height: 30,
    // justifyContent: "center",
    // alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal:10,
    paddingVertical:6
  },
  listContainer: {
    paddingBottom: 120,
    backgroundColor: "#F8F9FA",
  },
  trendingContainer: {
    marginBottom: 0,
    padding: 10,

    // borderRadius: 10,
   
  },
});

export default HomeScreen;
