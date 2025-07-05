import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from "react-native";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/loginbg`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setBgImage(data[0].image_url);
        }
      })
      .catch((err) => console.error("Error fetching background image:", err));
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateInputs = () => {
    setEmailError(!isValidEmail(email));
    setPasswordError(password.length < 8);
    return isValidEmail(email) && password.length >= 8;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("userid, toke coming from API",data.userId, data.email,data.token)
        if (data.userId && data.email && data.token) {
         
          await SecureStore.setItemAsync("jwt_token", data.token);
        
          await AsyncStorage.setItem("userId", data.userId.toString());
          await AsyncStorage.setItem("email", data.email);

        
          navigation.replace("SplashScreen");
        } else {
          Alert.alert("Error", "Invalid credentials");
        }
      })
      .catch(() => Alert.alert("Error", "Login failed"));
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, emailError && styles.errorInput]}
            keyboardType="email-address"
          />
          {emailError && <Text style={styles.errorText}>Invalid email format</Text>}

          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            style={[styles.input, passwordError && styles.errorInput]}
            secureTextEntry
          />
          {passwordError && <Text style={styles.errorText}>Password must be at least 8 characters</Text>}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  container: { flex: 1, padding: 20, justifyContent: "center" },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#444",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
    borderRadius: 5,
    borderColor: "#555",
    backgroundColor: "#000",
    color: "#fff",
  },
  errorInput: { borderColor: "red", borderWidth: 2 },
  errorText: { color: "red", fontSize: 12, marginBottom: 5, marginLeft: 5 },
  button: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },
  link: { color: "white", textAlign: "center", marginTop: 20, fontSize: 14 },
});

export default LoginScreen;
