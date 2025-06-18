import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, StyleSheet, Modal, Image,
  TouchableOpacity, ActivityIndicator
} from "react-native";
import OnSaleProducts from "./Products/OnSaleProducts";
import Completesets from "./Products/Completesets";
import TrendingProducts from "./Products/TrendingProducts";
import ShopLocation from "./Services/ShopLocation";
import Categories from "./Categories/Categories";
import ImageSlider from "./Sliders/Slider";
import UserNameDisplay from "./User/UserNameDisplay";
import BrandSlider from "./Sliders/BrandSlider";
import CustomerSupportoptions from "./User/CustomerSupportoptions";
import Loader from "./Loader/Loader";
import Constants from 'expo-constants';

const API_BASE_URL = Constants?.expoConfig?.extra?.API_BASE_URL || "";
const API_URL = `${API_BASE_URL}/api/sale-image`;

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    if (navigation) navigation.setOptions({ headerShown: false });

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data?.imageUrl) setImageUrl(data.imageUrl);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Image fetch error:", err.message);
        setLoading(false);
      });

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowCloseButton(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const safeRender = (Component) => {
    try {
      return <Component />;
    } catch (err) {
      console.error(`Component error: ${Component.name}`, err);
      return null;
    }
  };

  const sections = [
    {
      key: "UserName",
      component: (
        <View style={{ alignItems: "flex-start" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {safeRender(UserNameDisplay)}
          </Text>
        </View>
      )
    },
    { key: "Slider", component: <View style={{ marginTop: 15 }}>{safeRender(ImageSlider)}</View> },
    { key: "products", component: safeRender(Categories) },
    { key: "onsale", component: safeRender(OnSaleProducts) },
    { key: "brands", component: safeRender(BrandSlider) },
    {
      key: "trending",
      component: (
        <View>
          <Text style={styles.sectionTitle}>Trending Products</Text>
          {safeRender(TrendingProducts)}
        </View>
      )
    },
    { key: "accessorysets", component: <View style={styles.trendingContainer}>{safeRender(Completesets)}</View> },
    { key: "Shoplocation", component: safeRender(ShopLocation) },
    { key: "CustomerSupportoptions", component: safeRender(CustomerSupportoptions) },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Initial Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.topRight}>
              {!showCloseButton ? (
                <Text style={styles.countdownText}>{countdown}</Text>
              ) : (
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeText}>✖</Text>
                </TouchableOpacity>
              )}
            </View>
            {loading ? (
              <View style={styles.loaderContainer}>
                <Loader />
              </View>
            ) : imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.modalImage}
                onError={() => setImageUrl("")}
              />
            ) : (
              <Text>No Image Available</Text>
            )}
          </View>
        </View>
      </Modal>

      {/* Main Content */}
      <FlatList
        data={sections}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
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
    height: '60%',
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  modalImage: {
    width: "100%",
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  topRight: {
    position: "absolute",
    top: -15,
    right: -10,
    zIndex: 10
  },
  countdownText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF4500",
  },
  closeButton: {
    backgroundColor: "#FF6347",
    borderRadius: 999,
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  listContainer: {
    paddingBottom: 120,
    backgroundColor: "#F8F9FA",
  },
  trendingContainer: {
    marginBottom: 0,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: 20
  }
});

export default HomeScreen;
