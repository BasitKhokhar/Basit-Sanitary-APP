// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import OnSaleProducts from "./Products/OnSaleProducts";
// import Completesets from "./Products/Completesets";
// import TrendingProducts from "./Products/TrendingProducts";
// import ShopLocation from "./Services/ShopLocation";
// import Categories from "./Categories/Categories";
// import ImageSlider from "./Sliders/Slider";
// import UserNameDisplay from "./User/UserNameDisplay";
// import BrandSlider from "./Sliders/BrandSlider";
// import CustomerSupportoptions from "./User/CustomerSupportoptions";

// const HomeScreen = ({ navigation }) => {
//   React.useEffect(() => {
//     if (navigation) {
//       navigation.setOptions({ headerShown: false });
//     }
//   }, []);

//   const safeRender = (Component) => {
//     try {
//       return <Component />;
//     } catch (err) {
//       console.error(`Error in ${Component.name}:`, err);
//       return <Text style={{ color: 'red' }}>Error loading {Component.name}</Text>;
//     }
//   };

//   const sections = [
//     {
//       key: "UserName",
//       component: (
//         <View>
//           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//             {safeRender(UserNameDisplay)}
//           </Text>
//         </View>
//       )
//     },
//     { key: "Slider", component: <View style={{ marginTop: 15 }}>{safeRender(ImageSlider)}</View> },
//     { key: "products", component: safeRender(Categories) },
//     { key: "onsale", component: safeRender(OnSaleProducts) },
//     { key: "brands", component: safeRender(BrandSlider) },
//     {
//       key: "trending",
//       component: (
//         <View>
//           <Text style={styles.sectionTitle}>Trending Products</Text>
//           {safeRender(TrendingProducts)}
//         </View>
//       )
//     },
//     {
//       key: "accessorysets",
//       component: <View style={styles.trendingContainer}>{safeRender(Completesets)}</View>
//     },
//     { key: "Shoplocation", component: safeRender(ShopLocation) },
//     { key: "CustomerSupportoptions", component: safeRender(CustomerSupportoptions) },
//   ];

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={sections}
//         renderItem={({ item }) => item.component}
//         keyExtractor={(item) => item.key}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   listContainer: {
//     paddingBottom: 120,
//     backgroundColor: "#F8F9FA",
//   },
//   trendingContainer: {
//     marginBottom: 0,
//     padding: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: 'center',
//     marginTop: 20
//   }
// });

// export default HomeScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
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
import Constants from "expo-constants";
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState({
    sliderData: [],
    categoryData: [],
    brandData: [],
    onSaleProducts: [],
    trendingProducts: [],
    completeSets: [],
    
    // firstColumnData: [],
    // secondColumnData: [],
  });

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          { key: "sliderData", url: `${API_BASE_URL}/sliderimages` },
          { key: "categoryData", url: `${API_BASE_URL}/categories` },
          { key: "onSaleProducts", url: `${API_BASE_URL}/onsale_products` },
           { key: "brandData", url: `${API_BASE_URL}/brands` },
          { key: "trendingProducts", url: `${API_BASE_URL}/trending_products` },
          { key: "completeSets", url: `${API_BASE_URL}/complete_acessory_sets` },
         
          // { key: "firstColumnData", url: `${API_BASE_URL}/first_column_data` },
          // { key: "secondColumnData", url: `${API_BASE_URL}/second_column_data` },
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(endpoint.url)
              .then((res) => res.json())
              .then((data) => ({ key: endpoint.key, data }))
              .catch(() => ({ key: endpoint.key, data: [] }))
          )
        );

        const updated = responses.reduce((acc, { key, data }) => {
          acc[key] = data;
          return acc;
        }, {});

        setHomeData(updated);
      } catch (error) {
        console.error("Home data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
console.log("homedata",homeData)
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  const sections = [
    { key: "user", render: () => <UserNameDisplay /> },
    { key: "slider", render: () => <ImageSlider sliderData={homeData.sliderData} /> },
    { key: "categories", render: () => <Categories categoriesData={homeData.categoryData} /> },
    { key: "onSale", render: () => <OnSaleProducts products={homeData.onSaleProducts} /> },
    { key: "brands", render: () => <BrandSlider brands={homeData.brandData} /> },
    {
      key: "trending",
      render: () => (
        <>
          <Text style={styles.sectionTitle}>Trending Products</Text>
          <TrendingProducts products={homeData.trendingProducts} />
        </>
      ),
    },
    {
      key: "completeSets",
      render: () => <Completesets sets={homeData.completeSets} />,
    },
    // { key: "location", render: () => <ShopLocation /> },
    // {
    //   key: "support",
    //   render: () => (
    //     <CustomerSupportoptions
    //       firstColumnData={homeData.firstColumnData}
    //       secondColumnData={homeData.secondColumnData}
    //     />
    //   ),
    // },
  ];

  return (
   <FlatList
  data={sections}
  keyExtractor={(item) => item.key}
  renderItem={({ item }) => <View>{item.render()}</View>}
  contentContainerStyle={styles.listContainer}
  showsVerticalScrollIndicator={false}
  initialNumToRender={2} // only first 2 sections are rendered initially
  windowSize={5} // loads items within 5 screens (ahead & behind)
  maxToRenderPerBatch={3} // max render per batch
  updateCellsBatchingPeriod={100} // wait time between batches
/>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 120,
    backgroundColor: "#F8F9FA",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;




// import React, { useEffect, useState } from "react";
// import {
//   View, Text, FlatList, StyleSheet, Modal, Image,
//   TouchableOpacity
// } from "react-native";
// import OnSaleProducts from "./Products/OnSaleProducts";
// import Completesets from "./Products/Completesets";
// import TrendingProducts from "./Products/TrendingProducts";
// import ShopLocation from "./Services/ShopLocation";
// import Categories from "./Categories/Categories";
// import ImageSlider from "./Sliders/Slider";
// import UserNameDisplay from "./User/UserNameDisplay";
// import BrandSlider from "./Sliders/BrandSlider";
// import CustomerSupportoptions from "./User/CustomerSupportoptions";
// import Loader from "./Loader/Loader";
// import Constants from 'expo-constants';

// const API_BASE_URL = Constants?.expoConfig?.extra?.API_BASE_URL || "";
// const API_URL = `${API_BASE_URL}/api/sale-image`;

// const HomeScreen = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(true);
//   const [countdown, setCountdown] = useState(5);
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showCloseButton, setShowCloseButton] = useState(false);
//   const [isImageChecked, setIsImageChecked] = useState(false);

//   useEffect(() => {
//     console.log("🏁 HomeScreen mounted");

//     if (navigation) {
//       navigation.setOptions({ headerShown: false });
//       console.log("🔧 Navigation header hidden");
//     }

//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 10000); // timeout safety

//     console.log("🖼️ Starting fetch for sales image from:", API_URL);

//     fetch(API_URL, { signal: controller.signal })
//       .then((res) => {
//         if (!res.ok) throw new Error("❌ API error: " + res.status);
//         return res.json();
//       })
//       .then((data) => {
//         if (data?.imageUrl) {
//           console.log("✅ Sales image URL fetched:", data.imageUrl);
//           setImageUrl(data.imageUrl);
//         } else {
//           console.log("⚠️ No imageUrl found in API response");
//         }
//       })
//       .catch((err) => {
//         console.log("🚨 Image fetch error:", err.message);
//         setImageUrl("");
//       })
//       .finally(() => {
//         clearTimeout(timeoutId);
//         setLoading(false);
//         setIsImageChecked(true);
//         console.log("🎯 Sales image check completed — ready to render sections");
//       });

//     const interval = setInterval(() => {
//       setCountdown(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setShowCloseButton(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//       clearTimeout(timeoutId);
//       controller.abort();
//       console.log("🧹 Cleaned up timers and fetch controller");
//     };
//   }, []);

//   const safeRender = (Component) => {
//     try {
//       console.log(`📦 Rendering component: ${Component.name}`);
//       return <Component />;
//     } catch (err) {
//       console.error(`❗ Error in ${Component.name}:`, err);
//       return <Text style={{ color: 'red' }}>Error loading {Component.name}</Text>;
//     }
//   };

//   const sections = [
//     {
//       key: "UserName",
//       component: (
//         <View>
//           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//             {safeRender(UserNameDisplay)}
//           </Text>
//         </View>
//       )
//     },
//     { key: "Slider", component: <View style={{ marginTop: 15 }}>{safeRender(ImageSlider)}</View> },
//     { key: "products", component: safeRender(Categories) },
//     { key: "onsale", component: safeRender(OnSaleProducts) },
//     { key: "brands", component: safeRender(BrandSlider) },
//     {
//       key: "trending",
//       component: (
//         <View>
//           <Text style={styles.sectionTitle}>Trending Products</Text>
//           {safeRender(TrendingProducts)}
//         </View>
//       )
//     },
//     { key: "accessorysets", component: <View style={styles.trendingContainer}>{safeRender(Completesets)}</View> },
//     { key: "Shoplocation", component: safeRender(ShopLocation) },
//     { key: "CustomerSupportoptions", component: safeRender(CustomerSupportoptions) },
//   ];

//   return (
//     <View style={{ flex: 1 }}>
//       <Modal transparent visible={modalVisible} animationType="fade">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.topRight}>
//               {!showCloseButton ? (
//                 <Text style={styles.countdownText}>{countdown}</Text>
//               ) : (
//                 <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
//                   <Text style={styles.closeText}>✖</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//             {loading ? (
//               <View style={styles.loaderContainer}>
//                 <Loader />
//               </View>
//             ) : imageUrl ? (
//               <Image
//                 source={{ uri: imageUrl }}
//                 style={styles.modalImage}
//                 onError={() => {
//                   console.log("🖼️ Image load error");
//                   setImageUrl("");
//                 }}
//               />
//             ) : (
//               <Text>No Image Available</Text>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {isImageChecked && (
//         <FlatList
//           data={sections}
//           renderItem={({ item }) => {
//             console.log("🔄 Rendering section:", item.key);
//             return item.component;
//           }}
//           keyExtractor={(item) => item.key}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     width: "90%",
//     height: '60%',
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     alignItems: "center",
//     position: "relative",
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//     backgroundColor: '#fff',
//   },
//   modalImage: {
//     width: "100%",
//     height: '100%',
//     resizeMode: 'stretch',
//     borderRadius: 10,
//   },
//   topRight: {
//     position: "absolute",
//     top: -15,
//     right: -10,
//     zIndex: 10
//   },
//   countdownText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#FF4500",
//   },
//   closeButton: {
//     backgroundColor: "#FF6347",
//     borderRadius: 999,
//   },
//   closeText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//     paddingHorizontal: 10,
//     paddingVertical: 6
//   },
//   listContainer: {
//     paddingBottom: 120,
//     backgroundColor: "#F8F9FA",
//   },
//   trendingContainer: {
//     marginBottom: 0,
//     padding: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: 'center',
//     marginTop: 20
//   }
// });

// export default HomeScreen;
