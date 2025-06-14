import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#FF6600" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Acerca de</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Clutch Score</ThemedText>
          <ThemedText style={styles.description}>
            Clutch Score es una aplicación diseñada para analizar y visualizar el rendimiento de equipos de baloncesto, 
            con un enfoque especial en las situaciones de presión o "clutch".
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Características Principales</ThemedText>
          <View style={styles.featureItem}>
            <FontAwesome name="bar-chart" size={20} color="#FF6600" />
            <ThemedText style={styles.featureText}>
              Análisis detallado del rendimiento en situaciones clutch
            </ThemedText>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome name="cloud-upload" size={20} color="#FF6600" />
            <ThemedText style={styles.featureText}>
              Carga y análisis de datasets de equipos
            </ThemedText>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome name="area-chart" size={20} color="#FF6600" />
            <ThemedText style={styles.featureText}>
              Visualizaciones interactivas del rendimiento
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Versión</ThemedText>
          <ThemedText style={styles.version}>1.0.0</ThemedText>
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
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFE5CC',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 15,
    flex: 1,
  },
  version: {
    fontSize: 18,
    color: '#FF6600',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 