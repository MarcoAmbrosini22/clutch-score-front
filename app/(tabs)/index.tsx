import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.welcomeText}>¡Bienvenido!</ThemedText>
        <ThemedText style={styles.subtitle}>
          Gestiona tus datos y visualizaciones
        </ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Cargar Datos</ThemedText>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardContent}>
                <FontAwesome name="upload" size={24} color="#FF6600" />
                <ThemedText style={styles.cardTitle}>Equipo Propio</ThemedText>
                <ThemedText style={styles.cardDescription}>
                  Sube el dataset de tu equipo
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardContent}>
                <FontAwesome name="upload" size={24} color="#FF6600" />
                <ThemedText style={styles.cardTitle}>Equipo Rival</ThemedText>
                <ThemedText style={styles.cardDescription}>
                  Sube el dataset del equipo rival
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Visualizaciones</ThemedText>
          <TouchableOpacity
            style={styles.visualizationsButton}
            onPress={() => router.push('visualizations' as any)}
          >
            <LinearGradient
              colors={['#FF6600', '#FF8533']}
              style={styles.visualizationsGradient}
            >
              <FontAwesome name="bar-chart" size={24} color="white" />
              <ThemedText style={styles.visualizationsText}>
                Ver Visualizaciones
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFF4E6',
    borderBottomWidth: 2,
    borderBottomColor: '#FFE5CC',
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 15,
  },
  cardContainer: {
    marginBottom: 15,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#FFE5CC',
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
  visualizationsButton: {
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
  },
  visualizationsGradient: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  visualizationsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
}); 