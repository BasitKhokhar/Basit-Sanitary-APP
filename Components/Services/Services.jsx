import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Loader from '../Loader/Loader';

import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const Services = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [servicesData, setServicesData] = useState([]);
    const [plumbersData, setPlumbersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const [servicesRes, plumbersRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/services`).then(res => res.json()),
                    fetch(`${API_BASE_URL}/plumbers`).then(res => res.json())
                ]);
                setServicesData(servicesRes);
                setPlumbersData(plumbersRes);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (<View style={styles.loaderContainer}>
      <Loader />
    </View>)
    }

    return (
        <View style={{ paddingBottom: 110 }}>
            <FlatList
                key={"single-column"} // Forces re-render when switching to single-column layout
                data={plumbersData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
                ListHeaderComponent={
                    <View style={styles.maincontainer}>
                        <View style={styles.servicescontainer}>
                            <Text style={styles.heading}>Services</Text>
                            <Text style={styles.subHeading}>Explore Our Services</Text>

                            <View style={styles.serviceContainer}>
                                {/* Left Navigation */}
                                <View style={styles.navContainer}>
                                    {servicesData.map((service, index) => (
                                        <TouchableOpacity
                                            key={service.id}
                                            style={[styles.navButton, activeTab === index && styles.activeNavButton]}
                                            onPress={() => setActiveTab(index)}>
                                            <Text style={[styles.navText, activeTab === index && styles.activeNavText]}>{service.title}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* Right Content */}
                                <View style={styles.contentContainer}>
                                    {servicesData.length > 0 && (
                                        <View>
                                            <Image source={{ uri: servicesData[activeTab].image }} style={styles.image} />
                                            <Text style={styles.serviceTitle}>10+ Years Of Experience In Sanitary & Plumbing Services</Text>
                                            <Text style={styles.serviceDescription}>{servicesData[activeTab].description}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>

                            <Text style={styles.subHeading}>Our Plumbers</Text>
                        </View>
                    </View>

                }
                renderItem={({ item }) => (
                    <View style={styles.cardscontainer}>
                        <View style={styles.card}>
                            <View style={styles.cardimage}>
                                <Image source={{ uri: item.image_url }} style={styles.plumberImage} />
                            </View>
                            <View style={styles.cardright}>
                                <Text style={styles.cardTitle}>Name: {item.name}</Text>
                                <Text style={styles.cardText}>Contact: {item.contact}</Text>
                                <Text style={[styles.status, styles[item.status.toLowerCase().replace(' ', '')]]}>{item.status}</Text>
                            </View>
                        </View>
                    </View>

                )}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: 'black' },
    loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    maincontainer: { backgroundColor: '#1A1A1A', paddingTop: 30 },
    servicescontainer: { backgroundColor: '#F8F9FA', borderTopLeftRadius: 0, borderTopRightRadius: 70 },
    heading: { fontSize: 28, fontWeight: 'bold', marginTop: 40, textAlign: 'center' },
    subHeading: { fontSize: 22, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
    serviceContainer: { flexDirection: 'column', marginBottom: 20, padding: 15 },
    navContainer: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, gap: 10 },
    navButton: { padding: 10, width: '31%', borderWidth: 2, borderRadius: 10, borderColor: 'black', backgroundColor: '#f8f8f8' },
    activeNavButton: { backgroundColor: '#282828' },
    navText: { fontSize: 16, textAlign: 'center' },
    activeNavText: { color: '#fff' },
    contentContainer: { width: '100%' },
    image: { width: '100%', height: 150, borderRadius: 10 },
    serviceTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    serviceDescription: { fontSize: 14, marginTop: 5, color: '#666' },
   
    card: { flex: 1, flexDirection: "row", gap: 20, padding: 10, marginHorizontal: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, margin: 5, alignItems: 'center' },
    cardimage: {},
    cardright: {},
    plumberImage: { width: 100, height: 100, borderRadius: 0, marginBottom: 10 },
    cardTitle: { fontSize: 16, fontWeight: 'bold' },
    cardText: { fontSize: 14, color: '#666' },
    status: { color: "green", fontWeight: "800" }
});

export default Services;
