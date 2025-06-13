import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const { cartItems } = route.params;
  const cartItems = route.params?.cartItems || [];
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  // Calculate subtotal, shipping charges, and total amount
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCharges = subtotal < 200000 ? 5000 : 0;
  const totalAmount = subtotal + shippingCharges;
  const advancePayment = totalAmount * 0.2;

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserEmail = await AsyncStorage.getItem('email');
      setUserId(storedUserId ? Number(storedUserId) : null); 
      setUserEmail(storedUserEmail);
    };
    fetchUserId();
  }, []);
console.log("useremail in checkout",userEmail)
  return (

    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.header}>All Items</Text>
          </>
        }
        data={cartItems}
        keyExtractor={(item) => item.cart_id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemDetails}>
              <View style={styles.itemDetailsleft}>
                <Text style={styles.itemNo}>{index + 1}.</Text>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>Price: {item.price}</Text>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                </View>
              </View>

              <Text style={styles.itemTotal}>Total: {item.price * item.quantity}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <>
            {/* Price Summary */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>Subtotal: {subtotal} Rupees</Text>
              <Text style={styles.priceText}>Shipping Charges: {shippingCharges} Rupees</Text>
              <Text style={styles.totalAmount}>Total: {totalAmount} Rupees</Text>
              <Text style={styles.priceText}>Advance Payment (20%): {advancePayment} Rupees</Text>
            </View>
            <View style={styles.paymenttextcontainer}>
              <Text style={styles.paymentTextdescription}>Customers must pay 20% of the total order amount using mobile payment methods (Jazzcash or EasyPaisa APP installed in there Phones )  and upload the payment receipt in user Detail Form. The remaining 80% is payable upon delivery. </Text>
            </View>
            {/* Proceed to Payment */}
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => navigation.navigate('PaymentScreen', {
                user_id: userId,
                user_email: userEmail,
                subtotal,
                shipping_charges: shippingCharges,
                total_amount: totalAmount,
                advance_payment: advancePayment,
                cart_items: cartItems
              })}
            >
              <Text style={styles.paymentText}>Proceed to Payment</Text>
            </TouchableOpacity>

            {/* Enter User Details */}
            <TouchableOpacity
              style={styles.formButton}
              onPress={() => navigation.navigate('UserDetailsScreen', {
                user_id: userId,
                user_email: userEmail,
                subtotal,
                shipping_charges: shippingCharges,
                total_amount: totalAmount,
                advance_payment: advancePayment,
                cart_items: cartItems
              })}
            >
              <Text style={styles.formButtonText}>Enter Details and Confirm Order</Text>
            </TouchableOpacity>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#f9f9f9'
  },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  cartItem: {
    backgroundColor: 'white', borderRadius: 10, padding: 10, marginBottom: 10, marginHorizontal: 15, shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.2, // Shadow transparency
    shadowRadius: 4, // Shadow blur
    elevation: 5,
  },
  itemTextContainer: { marginHorizontal: 10 },
  itemDetails: { flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' },
  itemDetailsleft:{flexDirection: 'row',width:'69%', alignItems: 'center',gap:5},
  image: { width: 50, height: 50, borderRadius: 10,borderWidth:1 },
  itemTotal:{fontWeight:'bold',color:'green'},
  priceContainer: {
    padding: 15, marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.2, // Shadow transparency
    shadowRadius: 4, // Shadow blur
    elevation: 5,
  },
  priceText: { fontSize: 16, fontWeight: 'bold' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#ff5733', marginTop: 5 },
  paymenttextcontainer: { padding: 15, marginHorizontal: 15, backgroundColor: '#1A1A1A', borderRadius: 10, marginVertical: 10, },
  paymentTextdescription: { textAlign: 'justify',color:'white' },
  paymentButton: { backgroundColor: '#007bff', padding: 15, marginHorizontal: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  paymentText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  formButton: { marginHorizontal: 15, marginBottom: 20, backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  formButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  confirmButton: { backgroundColor: '#ff5733', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  confirmButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});


export default CheckoutScreen;
