import { ThemedText } from '@/components/ThemedText';
import { apiService } from '@/services/api';
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [healthInfo, setHealthInfo] = useState<string>('');

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const health = await apiService.healthCheck();
      setIsConnected(true);
      setHealthInfo(`${health.players_count} jugadores cargados`);
    } catch (error) {
      setIsConnected(false);
      setHealthInfo('');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  if (isConnected === null) {
    return (
      <View style={styles.container}>
        <FontAwesome name="circle-o-notch" size={16} color="#999" />
        <ThemedText style={styles.text}>Verificando conexión...</ThemedText>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={checkConnection} disabled={isChecking}>
      <FontAwesome 
        name={isConnected ? "check-circle" : "times-circle"} 
        size={16} 
        color={isConnected ? "#28a745" : "#dc3545"} 
      />
      <ThemedText style={[styles.text, { color: isConnected ? "#28a745" : "#dc3545" }]}>
        {isChecking ? "Verificando..." : (isConnected ? "Conectado" : "Sin conexión")}
      </ThemedText>
      {isConnected && healthInfo && (
        <ThemedText style={styles.healthInfo}>{healthInfo}</ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  healthInfo: {
    fontSize: 10,
    color: '#666',
    marginLeft: 6,
    fontStyle: 'italic',
  },
}); 