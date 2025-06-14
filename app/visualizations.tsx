import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function VisualizationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#FF6600" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Visualizaciones</ThemedText>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <FontAwesome name="bar-chart" size={24} color="#FF6600" />
            <ThemedText style={styles.cardTitle}>Puntaje Clutch</ThemedText>
            <ThemedText style={styles.cardDescription}>
              Ver gráfico de puntaje clutch por jugador
            </ThemedText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <FontAwesome name="line-chart" size={24} color="#FF6600" />
            <ThemedText style={styles.cardTitle}>Evolución del Equipo</ThemedText>
            <ThemedText style={styles.cardDescription}>
              Ver evolución del rendimiento partido a partido
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFF4E6',
    borderBottomWidth: 2,
    borderBottomColor: '#FFE5CC',
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6600',
    marginLeft: 15,
  },
  section: {
    padding: 20,
    gap: 15,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#FF6600',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6600',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
}); 