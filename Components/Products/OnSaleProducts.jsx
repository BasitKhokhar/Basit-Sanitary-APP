// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Animated,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LinearGradient } from "expo-linear-gradient";
// import ProductModal from "./ProductModal";
// import Constants from 'expo-constants';
// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// const { width } = Dimensions.get("window");
// const ITEM_WIDTH = width * 0.8;
// const ITEM_HEIGHT = 200;
// const SPACING = 0;
// const CENTER_OFFSET = (width - ITEM_WIDTH) / 2;

// const GRADIENT_COLORS = [
//   ["#1A1A1A", "#4B4B4B", "#696969"],
//   ["#8A2BE2", "#9370DB", "#BA55D3"],
//   ["#0000FF", "#4169E1", "#00BFFF"],
//   ["#87CEEB", "#4682B4", "#1E90FF"],
//   ["#00CED1", "#20B2AA", "#40E0D0"],
//   ["#008000", "#32CD32", "#00FA9A"],
//   ["#2F4F4F", "#556B2F", "#6B8E23"],
//   ["#FFD700", "#FFA500", "#FF8C00"],
//   ["#FF4500", "#FF6347", "#FF7F50"],
//   ["#A52A2A", "#B22222", "#DC143C"],
// ];

// const OnSaleProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const scrollX = React.useRef(new Animated.Value(0)).current;
//   const [imageErrors, setImageErrors] = useState({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/onsale_products`);
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setProducts(data);
//         } else {
//           console.warn("Unexpected API response format");
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const storedUserId = await AsyncStorage.getItem("userId");
//         if (storedUserId) {
//           setUserId(storedUserId);
//         }
//       } catch (error) {
//         console.error("Error fetching userId:", error);
//       }
//     };
//     fetchUserId();
//   }, []);

//   const openProductModal = (product) => {
//     setSelectedProduct(product);
//   };

//   const closeProductModal = () => {
//     setSelectedProduct(null);
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
//   }

//   if (!products.length) {
//     return (
//       <View style={{ paddingVertical: 40, alignItems: 'center' }}>
//         <Text style={{ color: 'gray', fontSize: 16 }}>No sale products available.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>On Sale Products</Text>
//       <Animated.FlatList
//         data={products}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={ITEM_WIDTH}
//         decelerationRate="fast"
//         pagingEnabled
//         contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: true }
//         )}
//         renderItem={({ item, index }) => {
//           const inputRange = [
//             (index - 1) * ITEM_WIDTH,
//             index * ITEM_WIDTH,
//             (index + 1) * ITEM_WIDTH,
//           ];

//           const scale = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.85, 1, 0.85],
//             extrapolate: "clamp",
//           });

//           const gradient = GRADIENT_COLORS[index % GRADIENT_COLORS.length];
//           const imageFailed = imageErrors[item.id];

//           return (
//             <Animated.View style={[styles.productCard, { transform: [{ scale }] }]}>
//               <LinearGradient
//                 colors={gradient}
//                 style={styles.gradientBackground}
//                 start={{ x: -0.2, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//               >
//                 <View style={styles.cardheader}>
//                   {!imageFailed ? (
//                     <Image
//                       source={{ uri: item.image_url }}
//                       style={styles.productImage}
//                       onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
//                     />
//                   ) : (
//                     <View style={[styles.productImage, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
//                       <Text style={{ color: 'white', fontSize: 10 }}>Image Error</Text>
//                     </View>
//                   )}
//                   <View style={styles.imagedata}>
//                     <Text style={styles.productName}>{item.name}</Text>
//                     <Text style={styles.productStock}>Stock: {item.stock}</Text>
//                     <Text style={styles.productPrice}>Before: {item.price}</Text>
//                     <Text style={styles.newProductPrice}>Now: {item.New_price}</Text>
//                     <TouchableOpacity
//                       style={styles.shopNowButton}
//                       onPress={() => openProductModal(item)}
//                     >
//                       <Text style={styles.shopNowText}>Shop Now</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           );
//         }}
//       />
//       {selectedProduct && (
//         <ProductModal product={selectedProduct} onClose={closeProductModal} userId={userId} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   loader: { marginTop: 50 },
//   container: { paddingVertical: 20 },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "black",
//   },
//   productCard: {
//     width: ITEM_WIDTH,
//     height: ITEM_HEIGHT,
//     marginHorizontal: SPACING / 2,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 3,
//   },
//   gradientBackground: {
//     flex: 1,
//     width: "100%",
//     borderRadius: 10,
//     padding: 10,
//     justifyContent: "center",
//   },
//   cardheader: {
//     flexDirection: "row",
//     justifyContent: 'space-between',
//     alignItems: "center",
//     paddingHorizontal: 10
//   },
//   productImage: {
//     width: 140,
//     height: 140,
//     borderRadius: 5,
//     borderWidth: 2,
//     borderColor: 'white'
//   },
//   imagedata: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '40%',
//   },
//   productName: { fontSize: 14, fontWeight: "bold", color: "#fff", marginTop: 5 },
//   productStock: { fontSize: 12, color: "#fff" },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "red",
//     textDecorationLine: "line-through"
//   },
//   newProductPrice: { fontSize: 16, fontWeight: "bold", color: "#fff" },
//   shopNowButton: {
//     marginTop: 8,
//     backgroundColor: "#fff",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     borderWidth: 2
//   },
//   shopNowText: { color: "black", fontSize: 14, fontWeight: "bold", textAlign: 'center' },
// });

// export default OnSaleProducts;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import ProductModal from "./ProductModal";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = 200;
const SPACING = 0;
const CENTER_OFFSET = (width - ITEM_WIDTH) / 2;

const GRADIENT_COLORS = [
  ["#1A1A1A", "#4B4B4B", "#696969"],
  ["#8A2BE2", "#9370DB", "#BA55D3"],
  ["#0000FF", "#4169E1", "#00BFFF"],
  ["#87CEEB", "#4682B4", "#1E90FF"],
  ["#00CED1", "#20B2AA", "#40E0D0"],
  ["#008000", "#32CD32", "#00FA9A"],
  ["#2F4F4F", "#556B2F", "#6B8E23"],
  ["#FFD700", "#FFA500", "#FF8C00"],
  ["#FF4500", "#FF6347", "#FF7F50"],
  ["#A52A2A", "#B22222", "#DC143C"],
];

const OnSaleProducts = ({ products }) => {
  const [userId, setUserId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) setUserId(storedUserId);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };
    fetchUserId();
  }, []);

  const openProductModal = (product) => setSelectedProduct(product);
  const closeProductModal = () => setSelectedProduct(null);

  if (!products || products.length === 0) {
    return (
      <View style={{ paddingVertical: 40, alignItems: "center" }}>
        <Text style={{ color: "gray", fontSize: 16 }}>
          No sale products available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>On Sale Products</Text>
      <Animated.FlatList
        data={products}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: "clamp",
          });

          const gradient = GRADIENT_COLORS[index % GRADIENT_COLORS.length];
          const imageFailed = imageErrors[item.id];

          return (
            <Animated.View style={[styles.productCard, { transform: [{ scale }] }]}>
              <LinearGradient
                colors={gradient}
                style={styles.gradientBackground}
                start={{ x: -0.2, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardheader}>
                  {!imageFailed ? (
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.productImage}
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [item.id]: true }))
                      }
                    />
                  ) : (
                    <View
                      style={[
                        styles.productImage,
                        { backgroundColor: "#ccc", justifyContent: "center", alignItems: "center" },
                      ]}
                    >
                      <Text style={{ color: "white", fontSize: 10 }}>Image Error</Text>
                    </View>
                  )}

                  <View style={styles.imagedata}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productStock}>Stock: {item.stock}</Text>
                    <Text style={styles.productPrice}>Before: {item.price}</Text>
                    <Text style={styles.newProductPrice}>Now: {item.New_price}</Text>
                    <TouchableOpacity
                      style={styles.shopNowButton}
                      onPress={() => openProductModal(item)}
                    >
                      <Text style={styles.shopNowText}>Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
          );
        }}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} userId={userId} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { marginTop: 50 },
  container: { paddingBottom: 30 },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  productCard: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING / 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
  },
  cardheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  productImage: {
    width: 140,
    height: 140,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
  },
  imagedata: {
    flexDirection: "column",
    width: "40%",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  productStock: { fontSize: 12, color: "#fff" },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    textDecorationLine: "line-through",
  },
  newProductPrice: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  shopNowButton: {
    marginTop: 8,
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 2,
  },
  shopNowText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OnSaleProducts;
