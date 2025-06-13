import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductModal from "./ProductModal";
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const Completesets = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/complete_acessory_sets`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trending products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };
    fetchUserId();
  }, []);

  const openProductModal = (product) => {
    const formattedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock: product.stock || "N/A",
      subcategory_id: product.subcategory_id,
      created_at: product.created_at,
      updated_at: product.updated_at,
    };
    setSelectedProduct(formattedProduct);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Complete Accessory Sets</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <View style={[styles.productCard, index % 2 === 0 ? styles.offsetCard : {}]}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productStock}>Stock: {item.stock}</Text>
            <Text style={styles.newProductPrice}>Now: {item.price}</Text>
            <TouchableOpacity style={styles.shopNowButton} onPress={() => openProductModal(item)}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeProductModal} userId={userId} />}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { marginTop: 50 },
  container: {
    flex: 1,
    // backgroundColor: "#F8F9FA", // Light background
    padding: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333", // Dark text
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  offsetCard: {
    marginTop: 20, // Staggered layout
  },
  productImage: { width: 100, height: 100, borderRadius: 5,borderWidth:2,borderColor:'black' },
  productName: { fontSize: 14, fontWeight: "bold", marginTop: 5, textAlign: "center", color: "#333" },
  productStock: { fontSize: 12, color: "#666" },
  productPrice: { fontSize: 16, fontWeight: "bold", color: "#888", textDecorationLine: "line-through" },
  newProductPrice: { fontSize: 16, fontWeight: "bold", color: "#E44D26" },
  shopNowButton: {
    marginTop: 8,
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  shopNowText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Completesets;
