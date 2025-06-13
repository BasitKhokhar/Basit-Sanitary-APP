import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const screenWidth = Dimensions.get('window').width;
const cardPadding = 20; // Horizontal padding of parent container
const cardWidth = screenWidth * 0.28; // Each card takes 40% of screen width
const cardSpacing = 10; // Spacing between cards

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA', paddingVertical: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true} // Makes the list scroll horizontally
        showsHorizontalScrollIndicator={false} // Hides the scroll bar
        contentContainerStyle={{ paddingLeft: cardPadding, paddingRight: cardPadding }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: cardWidth,
              marginRight: cardSpacing, // Space between cards
            }}
            onPress={() => navigation.navigate('Subcategories', { categoryId: item.id })}
          >
            <View style={{
              backgroundColor: '#ffffff',
              padding: 10,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}>
              <Image
                source={{ uri: item.image_url }}
                style={{
                  width: '100%', height: 90, borderRadius: 5,
                }}
                resizeMode="cover"
              />
            </View>

            <Text style={{ fontSize: 14, textAlign: 'center', fontWeight: '500', marginTop: 5 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
