import React, { useState, useEffect } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import SignupScreen from "./Components/Authentication/Signup";
import LoginScreen from "./Components/Authentication/Login";
import HomeScreen from "./Components/Home";
import ProductsScreen from "./Components/Products/ProductsScreen";
import CartScreen from "./Components/Cart/CartScreen";
import CheckoutScreen from "./Components/Cart/CheckoutScreen";
import AddressScreen from "./Components/Cart/AddressScreen";
import PaymentScreen from "./Components/Cart/PaymentScreen";
import Categories from "./Components/Categories/Categories";
import Subcategories from "./Components/Categories/Subcategories";
import Products from "./Components/Categories/Products";
import SearchScreen from "./Components/Products/SearchScreen";
import SplashScreen from "./Components/SplashScreens/SplashScreen";
import SplashScreen1 from "./Components/SplashScreens/SplashScreen1";
import SplashScreen2 from "./Components/SplashScreens/SplashScreen2";
import UserDetailsScreen from "./Components/Cart/UserDetailsScreen";
import UserScreen from "./Components/User/UserScreen";
import AccountDetailScreen from "./Components/User/AccountDetailScreen";
import CustomerSupportScreen from "./Components/User/CustomerSupportScreen";
import FAQ from "./Components/User/FAQ";
import Services from "./Components/Services/Services";
import About from "./Components/User/About";
import StripePayment from "./Components/Cart/StripePayment";
import LogoutScreen from "./Components/User/LogoutScreen";
import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const stripeKey = Constants.expoConfig.extra.stripePublishableKey;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainLayout = ({ navigation, children, currentScreen }) => {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/logo_image`);
        const data = await response.json();
        if (data.length > 0) {
          setLogo(data[0].image_url);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    fetchLogo();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {logo && <Image source={{ uri: logo }} style={styles.logo} />}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <Text style={styles.searchText}>Search...</Text>
          <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>{children}</View>
      <View style={styles.footer}>
        {[
          { name: "Home", icon: "home" },
          { name: "Products", icon: "shopping-bag" },
          { name: "Cart", icon: "shopping-cart" },
          { name: "Services", icon: "build" },
          { name: "Profile", icon: "person" },
        ].map(({ name, icon }) => (
          <TouchableOpacity
            key={name}
            style={styles.footerButton}
            onPress={() => navigation.navigate(name)}
          >
            <Icon
              name={icon}
              size={24}
              color={currentScreen === name ? "#fff" : "gray"}
            />
            {name === "Cart" > 0 && (
              <View style={styles.cartBadge}>
                {/* <Text style={styles.cartCount}></Text> */}
              </View>
            )}
            <Text
              style={[
                styles.footerText,
                { color: currentScreen === name ? "#fff" : "gray" },
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Home">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Home">
            <HomeScreen />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="Products">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Products">
            <ProductsScreen />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="Cart">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Cart">
            <CartScreen />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="Services">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Services">
            <Services />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Profile">
            <UserScreen />
          </MainLayout>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
const App = () => {
  const [userId, setUserId] = useState(null);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [isSplash1Visible, setIsSplash1Visible] = useState(true);
  const [isSplash2Visible, setIsSplash2Visible] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("jwt_token");
        const storedUserId = await AsyncStorage.getItem("userId");

        if (token && storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error checking login:", error);
      } finally {
        setCheckingLogin(false);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const splashFlow = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsSplash1Visible(false);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsSplash2Visible(false);
    };

    splashFlow();
  }, []);

  // Show splash screens if still visible
  if (isSplash1Visible) {
    return <SplashScreen1 />;
  }

  if (isSplash2Visible) {
    return <SplashScreen2 onNext={() => setIsSplash2Visible(false)} />;
  }

  // Wait for login check to complete
  if (checkingLogin) {
    return <SplashScreen />;
  }

  return (
    <StripeProvider
      publishableKey={stripeKey}
      merchantDisplayName="Basit Sanitary App"
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={userId ? "Main" : "Login"}>
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} setUserId={setUserId} />}
          </Stack.Screen>
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {(props) => <BottomTabs {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Checkout" }} />
          <Stack.Screen name="AddressScreen" component={AddressScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="Profile" component={UserScreen} options={{ title: "Profile" }} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Subcategories" component={Subcategories} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: "Search Products" }} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
          <Stack.Screen name="User" component={UserScreen} />
          <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
          <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
          <Stack.Screen name="faq" component={FAQ} />
          <Stack.Screen name="about" component={About} />
          <Stack.Screen name="StripePayment" component={StripePayment} />
          <Stack.Screen name="Logout" component={LogoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#1A1A1A",
    paddingTop: 15,
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: { width: 100, height: 40, resizeMode: "contain", backgroundColor: '#1A1A1A' },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 35,
    width: "50%",
  },
  searchText: { flex: 1, color: "#555" },
  searchIcon: { marginLeft: 5 },
  body: { flex: 1, padding: 0 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1A1A1A",
    paddingTop: 15,
    paddingBottom: 15,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },
  footerButton: { alignItems: "center" },
  footerText: { fontSize: 12, fontWeight: "bold", marginTop: 5 },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  // cartCount: { color: "white", fontWeight: "bold" },
});

