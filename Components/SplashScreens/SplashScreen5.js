// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// const SplashScreen5 = ({onNext, onGooglePress, onEmailPress }) => {
//   return (
//     <View style={styles.container}>
//       {/* Logo at top */}
//       <Image
//         source={require("../assets/icon2.png")} // Replace with your logo path
//         style={styles.logo}
//       />

//       {/* Heading */}
//       <Text style={styles.heading}>Let’s Get Started</Text>

//       {/* Continue with Google Button */}
//       <TouchableOpacity style={styles.googleButton} onPress={onGooglePress}>
//         <Text style={styles.googleButtonText}>Continue with Google</Text>
//       </TouchableOpacity>

//       {/* Continue with Email Button */}
//       <TouchableOpacity style={styles.emailButton} onPress={onEmailPress}>
//         <Text style={styles.emailButtonText}>Continue with Email</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     resizeMode: "contain",
//     marginBottom: 30,
//   },
//   heading: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#8b3dff",
//     marginBottom: 40,
//   },
//   googleButton: {
//     backgroundColor: "#db4437",
//     width: "100%",
//     paddingVertical: 12,
//     borderRadius: 30,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   googleButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   emailButton: {
//     backgroundColor: "#8b3dff",
//     width: "100%",
//     paddingVertical: 12,
//     borderRadius: 30,
//     alignItems: "center",
//   },
//   emailButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default SplashScreen5;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../Themes/colors";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const SplashScreen5 = ({ onNext }) => {
  return (
    <View style={styles.container}>
      {/* Top Image with Gradient Overlay */}
      <View style={styles.topContainer}>
        <Image
          source={require("../../assets/splash4.jpg")}
          style={styles.image}
        />
        <LinearGradient
          colors={["transparent", "rgba(99, 99, 99, 0.8)", colors.bodybackground]}
          style={styles.overlay}
        >
          <Text style={styles.title}>✨ Join Us for a Better Sanitary Experience!</Text>
        </LinearGradient>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          Create an account to explore our wide range of high-quality sanitary products. Sign up now for an enhanced shopping experience!
        </Text>

        <TouchableOpacity onPress={onNext} activeOpacity={0.9} style={styles.buttonWrapper}>
          <LinearGradient
            colors={colors.gradients.mintGlow} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Lets Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bodybackground,
    alignItems: "center",
  },
  topContainer: {
    width: "100%",
    height: "70%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    textShadowColor: colors.primary,
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: 10,
    paddingHorizontal: 20,
  },
  contentContainer: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: colors.mutedText,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonWrapper: {
    width: "100%",
    borderRadius: 40,
    shadowColor: colors.accent,
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 8,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
});

export default SplashScreen5;
