// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import Constants from 'expo-constants';
// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
// const SplashScreen2 = ({ onNext }) => {
//   const [imageUrl, setImageUrl] = useState(null);

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/splash-image3`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.length > 0) {
//           setImageUrl(data[0].image_url);
//         }
//       })
//       .catch((error) => console.error("Error fetching image:", error));
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.topcontainer}>
//       {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
//       </View>
     
//       <Text style={styles.title}>Join Us for a Better Sanitary Experience!</Text>
//       <Text style={styles.description}>
//         Create an account to explore our wide range of high-quality sanitary products. Sign up now for an enhanced shopping experience!
//       </Text>
//       <TouchableOpacity style={styles.button} onPress={onNext}>
//         <Text style={styles.buttonText}>Register Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: "center",
//     alignItems: "center",
//     padding: 0,
//     backgroundColor: "black",
//   },
//   topcontainer:{
//     width:"100%",
//     // height:"30%",
//     flex: 1,
//     justifyContent: "center",
//     // alignItems: "center",
//     padding: 0,
//     backgroundColor: "gray",
//     borderBottomLeftRadius:100,
//     borderBottomRightRadius:100
//   },
//   image: {
//     width: "100%",
//     height: "100%", // Takes half of the screen
//     resizeMode: "stretch",
//     borderBottomLeftRadius:60,
//     borderBottomRightRadius:60,
//     // marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#10B981",
//     marginVertical: 10,
//     textAlign: "center",
//   },
//   description: {
//     fontSize: 16,
//     color: "white",
//     textAlign: "center",
//     marginBottom: 20,
//     marginTop:10
//   },
//   button: {
//     backgroundColor: "#10B981",
//     padding: 12,
//     borderRadius: 50,
//     alignItems: "center",
//     marginBottom: 80,
//     width:"90%"
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default SplashScreen2;
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../Themes/colors";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const SplashScreen2 = ({ onNext }) => {
  return (
    <View style={styles.container}>
      {/* Top Image with gradient overlay */}
      <View style={styles.topContainer}>
        <ImageBackground
          source={require("../../assets/splash1.jpg")}
          style={styles.image}
        >
          {/* Gradient Overlay at bottom */}
          <LinearGradient
            colors={["transparent", "rgba(99, 99, 99, 0.8)", colors.bodybackground]}
            style={styles.overlay}
          >
            <Text style={styles.title}>✨ Your Trusted Sanitary Shopping Destination</Text>
          </LinearGradient>
        </ImageBackground>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          Discover premium sanitary products and modern bathroom solutions — all in one easy-to-use shopping app.
        </Text>

        {/* Neon Gradient Button */}
        <TouchableOpacity
          onPress={onNext}
          activeOpacity={0.9}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={colors.gradients.mintGlow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
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
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  overlay: {
    width: "100%",
    padding: 20,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    textShadowColor: colors.primary,
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: 10,
  },
  contentContainer: {
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor:colors.cardsbackground
  },
  description: {
    fontSize: 16,
    color: colors.mutedText,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 0,
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

export default SplashScreen2;
