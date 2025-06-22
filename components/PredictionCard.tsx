import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PredictionCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color?: string;
  loading?: boolean;
}

export function PredictionCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = '#FF6600',
  loading = false 
}: PredictionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <FontAwesome name={icon as any} size={24} color={color} />
        </View>
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {loading ? (
            <ThemedText style={styles.loadingText}>Cargando...</ThemedText>
          ) : (
            <ThemedText style={[styles.value, { color }]}>{value}</ThemedText>
          )}
          {subtitle && (
            <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFE5CC',
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
}); 