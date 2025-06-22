import { PlayerList } from '@/components/PlayerList';
import { ThemedText } from '@/components/ThemedText';
import { apiService, HighPotentialPlayersResponse } from '@/services/api';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const [highPotentialPlayers, setHighPotentialPlayers] = useState<HighPotentialPlayersResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHighPotentialPlayers();
  }, []);

  const loadHighPotentialPlayers = async () => {
    setLoading(true);
    try {
      const data = await apiService.findHighPotentialPlayers(10);
      setHighPotentialPlayers(data);
    } catch (error) {
      console.error('Error loading high potential players:', error);
      // No mostrar alerta, solo log del error
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerSelect = (player: any) => {
    // Navegar a visualizations con el jugador ya buscado
    router.push({
      pathname: 'visualizations' as any,
      params: { searchQuery: player.player }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.welcomeText}>¡Bienvenido!</ThemedText>
        <ThemedText style={styles.subtitle}>
          Gestiona tus datos y análisis de jugadores
        </ThemedText>
      </View>

      <View style={styles.content}>
        {/* Información de conexión */}
        <View style={styles.connectionInfo}>
          <FontAwesome name="server" size={16} color="#28A745" />
          <ThemedText style={styles.connectionText}>
            Conectado al backend de análisis
          </ThemedText>
        </View>

        {/* Botón principal */}
        <View style={styles.mainButtons}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => router.push('visualizations' as any)}
          >
            <FontAwesome name="search" size={24} color="white" />
            <ThemedText style={styles.mainButtonText}>
              Análisis de Jugadores
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Sección de Alto Potencial integrada */}
        <View style={styles.highPotentialSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleContainer}>
              <FontAwesome name="star" size={20} color="#FF6600" />
              <ThemedText style={styles.sectionTitle}>Jugadores con Alto Potencial</ThemedText>
            </View>
            <TouchableOpacity 
              style={styles.reloadButton}
              onPress={loadHighPotentialPlayers}
              disabled={loading}
            >
              <FontAwesome name="refresh" size={16} color="#FF6600" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.infoCard}>
            <FontAwesome name="info-circle" size={16} color="#FF6600" />
            <ThemedText style={styles.infoText}>
              Selecciona un jugador para ver su análisis completo
            </ThemedText>
          </View>

          {highPotentialPlayers && (
            <PlayerList
              title=""
              players={highPotentialPlayers.players}
              loading={loading}
              onPlayerPress={handlePlayerSelect}
              renderPlayerInfo={(player) => (
                <View>
                  <ThemedText style={styles.playerInfoText}>
                    Posición: {player.position} | Equipo: {player.team}
                  </ThemedText>
                  {player.clutch_score && (
                    <ThemedText style={styles.clutchScoreText}>
                      ⭐ Clutch Score: {player.clutch_score}
                    </ThemedText>
                  )}
                </View>
              )}
            />
          )}
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
  connectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FFF8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D4EDDA',
  },
  connectionText: {
    fontSize: 14,
    color: '#155724',
    marginLeft: 8,
    fontWeight: '500',
  },
  mainButtons: {
    marginBottom: 25,
  },
  mainButton: {
    backgroundColor: '#FF6600',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#FF6600',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  highPotentialSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6600',
    marginLeft: 8,
  },
  reloadButton: {
    padding: 8,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFE5CC',
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  playerInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  clutchScoreText: {
    fontSize: 14,
    color: '#FF6600',
    fontWeight: '600',
  },
}); 