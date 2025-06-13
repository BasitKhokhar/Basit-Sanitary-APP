import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// Icon mapping array
const icons = ["car", "life-ring", "rotate-right", "lock"];

// Gradient colors for each card
const gradients = [
  ['#FF5733', '#FF8D33'], // Orange-Red
  ['#FC466B', '#3F5EFB'], // Pink to Indigo
  ['#3357FF', '#338DFF'], // Blue
  ['#FF33A8', '#FF3380'], // Pink
];

const CustomerSupportOptions = () => {
  const [firstColumnData, setFirstColumnData] = useState([]);
  const [secondColumnData, setSecondColumnData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from separate APIs
      const response1 = await fetch(`${API_BASE_URL}/first_column_data`);
      const data1 = await response1.json();

      const response2 = await fetch(`${API_BASE_URL}/second_column_data`);
      const data2 = await response2.json();

      setFirstColumnData(data1);
      setSecondColumnData(data2);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#282828" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* First Column */}
      <View style={styles.column}>
        {firstColumnData.map((item, index) => (
          <LinearGradient
            colors={gradients[index % gradients.length]} // Assign gradient based on index
            style={[styles.card, index === 0 ? styles.tallCard : styles.shortCard]}
            key={item.id}
          >
            <FontAwesome name={icons[index]} size={40} color="#fff" style={styles.icon} />
            <Text style={styles.heading}>{item.headings}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </LinearGradient>
        ))}
      </View>

      {/* Second Column */}
      <View style={styles.column}>
        {secondColumnData.map((item, index) => (
          <LinearGradient
            colors={gradients[(index + 2) % gradients.length]} // Assign gradient based on index
            style={[styles.card, index === 0 ? styles.shortCard : styles.tallCard]}
            key={item.id}
          >
            <FontAwesome name={icons[index + 2]} size={40} color="#fff" style={styles.icon} />
            <Text style={styles.heading}>{item.headings}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </LinearGradient>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#282828',
    padding: 16,
    flex: 1,
  },
  column: {
    flex: 1,
  },
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Shadow effect
  },
  tallCard: {
    height: 220, // Taller card
  },
  shortCard: {
    height: 170, // Shorter card
  },
  icon: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomerSupportOptions;
