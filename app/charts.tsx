import { ConnectionStatus } from '@/components/ConnectionStatus';
import { PlayerList } from '@/components/PlayerList';
import { ThemedText } from '@/components/ThemedText';
import { apiService, GoalPrediction, Player, SanctionPrediction, SearchPlayersResponse, SimilarPlayersResponse, TacticalRole } from '@/services/api';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function ChartsScreen() {
  const [searchResults, setSearchResults] = useState<SearchPlayersResponse | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPlayerData, setLoadingPlayerData] = useState(false);
  
  // Datos del jugador seleccionado
  const [goalPrediction, setGoalPrediction] = useState<GoalPrediction | null>(null);
  const [sanctionPrediction, setSanctionPrediction] = useState<SanctionPrediction | null>(null);
  const [tacticalRole, setTacticalRole] = useState<TacticalRole | null>(null);
  const [similarPlayers, setSimilarPlayers] = useState<SimilarPlayersResponse | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    setSelectedPlayer(null);
    setGoalPrediction(null);
    setSanctionPrediction(null);
    setTacticalRole(null);
    setSimilarPlayers(null);
    
    try {
      const results = await apiService.searchPlayers(searchQuery, 15);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching players:', error);
      Alert.alert('Error', 'No se pudieron buscar jugadores. Verifica la conexión con el backend.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerSelect = async (player: any) => {
    // Limpiar todos los resultados anteriores
    setGoalPrediction(null);
    setSanctionPrediction(null);
    setTacticalRole(null);
    setSimilarPlayers(null);
    
    setSelectedPlayer(player);
    setLoadingPlayerData(true);
    
    try {
      // Cargar todas las estadísticas del jugador
      const [goals, sanctions, role, similar] = await Promise.all([
        apiService.predictGoals(player.player),
        apiService.predictSanction(player.player),
        apiService.getPlayerTacticalRole(player.player),
        apiService.findSimilarPlayers(player.player, 5)
      ]);
      
      setGoalPrediction(goals);
      setSanctionPrediction(sanctions);
      setTacticalRole(role);
      setSimilarPlayers(similar);
    } catch (error) {
      console.error('Error loading player data:', error);
      Alert.alert('Error', 'No se pudieron cargar las estadísticas del jugador');
    } finally {
      setLoadingPlayerData(false);
    }
  };

  const getPlayerStatsData = () => {
    if (!selectedPlayer) return null;

    const stats = [];
    
    if (goalPrediction?.predicted_goals !== undefined) {
      stats.push({
        label: 'Goles Predichos',
        value: goalPrediction.predicted_goals,
        color: '#FF6600'
      });
    }
    
    if (sanctionPrediction?.sanction_risk_percentage) {
      const risk = parseFloat(sanctionPrediction.sanction_risk_percentage.replace('%', ''));
      stats.push({
        label: 'Riesgo Sanciones',
        value: risk,
        color: risk > 70 ? '#DC3545' : risk > 30 ? '#FFC107' : '#28A745'
      });
    }

    if (selectedPlayer.clutch_score !== undefined) {
      stats.push({
        label: 'Clutch Score',
        value: selectedPlayer.clutch_score,
        color: '#FF8533'
      });
    }

    return stats.length > 0 ? {
      labels: stats.map(s => s.label),
      datasets: [{
        data: stats.map(s => s.value),
      }],
    } : null;
  };

  const getSimilarPlayersData = () => {
    if (!similarPlayers?.similar_players) return null;

    return {
      labels: similarPlayers.similar_players.map((p: Player) => p.player.split(' ')[0]),
      datasets: [{
        data: similarPlayers.similar_players.map((p: Player) => p.clutch_score || 0),
      }],
    };
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 102, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#FF6600',
    },
  };

  return (
    <View style={styles.container}>
      <ConnectionStatus />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={24} color="#FF6600" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Gráficos y Estadísticas</ThemedText>
        </View>

        <View style={styles.content}>
          {/* Información inicial */}
          <View style={styles.infoSection}>
            <FontAwesome name="info-circle" size={24} color="#FF6600" />
            <ThemedText style={styles.infoText}>
              Busca y selecciona un jugador para ver sus estadísticas individuales en gráficos
            </ThemedText>
          </View>

          {/* Búsqueda de jugadores */}
          <View style={styles.searchSection}>
            <ThemedText style={styles.sectionTitle}>Buscar Jugadores</ThemedText>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Ej: Carlos, Juan, etc..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
              <TouchableOpacity 
                style={styles.searchButton}
                onPress={handleSearch}
                disabled={loading}
              >
                <FontAwesome name="search" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Estado de carga de búsqueda */}
          {loading && (
            <View style={styles.loadingSection}>
              <FontAwesome name="spinner" size={24} color="#FF6600" />
              <ThemedText style={styles.loadingText}>Buscando jugadores...</ThemedText>
            </View>
          )}

          {/* Resultados de búsqueda */}
          {searchResults && !loading && (
            <PlayerList
              title={`Resultados para "${searchResults.query}" (${searchResults.count})`}
              players={searchResults.players}
              onPlayerPress={handlePlayerSelect}
              renderPlayerInfo={(player) => (
                <View>
                  <ThemedText style={styles.playerInfoText}>
                    Posición: {player.position} | Equipo: {player.team}
                  </ThemedText>
                  {player.clutch_score && (
                    <ThemedText style={styles.playerInfoText}>
                      Clutch Score: {player.clutch_score}
                    </ThemedText>
                  )}
                </View>
              )}
            />
          )}

          {/* Estado de carga de datos del jugador */}
          {loadingPlayerData && (
            <View style={styles.loadingSection}>
              <FontAwesome name="spinner" size={24} color="#FF6600" />
              <ThemedText style={styles.loadingText}>Cargando estadísticas del jugador...</ThemedText>
            </View>
          )}

          {/* Gráficos del jugador seleccionado */}
          {selectedPlayer && !loadingPlayerData && (
            <>
              {/* Información del jugador */}
              <View style={styles.playerInfoSection}>
                <ThemedText style={styles.playerName}>{selectedPlayer.player}</ThemedText>
                <ThemedText style={styles.playerDetails}>
                  {selectedPlayer.position} • {selectedPlayer.team}
                  {selectedPlayer.clutch_score && ` • Clutch Score: ${selectedPlayer.clutch_score}`}
                </ThemedText>
              </View>

              {/* Gráfico de estadísticas principales */}
              {getPlayerStatsData() && (
                <View style={styles.chartSection}>
                  <ThemedText style={styles.sectionTitle}>📊 Estadísticas Principales</ThemedText>
                  <ThemedText style={styles.chartDescription}>
                    Métricas clave del jugador seleccionado
                  </ThemedText>
                  <BarChart
                    data={getPlayerStatsData()!}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    yAxisLabel=""
                    yAxisSuffix=""
                    style={styles.chart}
                  />
                </View>
              )}

              {/* Gráfico de jugadores similares */}
              {getSimilarPlayersData() && (
                <View style={styles.chartSection}>
                  <ThemedText style={styles.sectionTitle}>👥 Jugadores Similares</ThemedText>
                  <ThemedText style={styles.chartDescription}>
                    Comparación de clutch score con jugadores similares
                  </ThemedText>
                  <BarChart
                    data={getSimilarPlayersData()!}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    yAxisLabel=""
                    yAxisSuffix=""
                    style={styles.chart}
                  />
                </View>
              )}

              {/* Predicciones detalladas */}
              {(goalPrediction || sanctionPrediction || tacticalRole) && (
                <View style={styles.predictionsSection}>
                  <ThemedText style={styles.sectionTitle}>🔮 Predicciones</ThemedText>
                  
                  {goalPrediction && (
                    <View style={styles.predictionCard}>
                      <ThemedText style={styles.predictionTitle}>⚽ Goles Predichos</ThemedText>
                      <ThemedText style={styles.predictionValue}>{goalPrediction.predicted_goals}</ThemedText>
                    </View>
                  )}

                  {sanctionPrediction && (
                    <View style={styles.predictionCard}>
                      <ThemedText style={styles.predictionTitle}>🟨 Riesgo de Sanciones</ThemedText>
                      <ThemedText style={styles.predictionValue}>{sanctionPrediction.sanction_risk_percentage}</ThemedText>
                    </View>
                  )}

                  {tacticalRole && (
                    <View style={styles.predictionCard}>
                      <ThemedText style={styles.predictionTitle}>🎯 Rol Táctico</ThemedText>
                      <ThemedText style={styles.predictionValue}>{tacticalRole.tactical_role}</ThemedText>
                    </View>
                  )}
                </View>
              )}
            </>
          )}

          {/* Mensaje cuando no hay búsqueda */}
          {!searchResults && !loading && (
            <View style={styles.noDataSection}>
              <FontAwesome name="bar-chart" size={48} color="#CCC" />
              <ThemedText style={styles.noDataText}>
                Busca un jugador para ver sus estadísticas individuales
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  scrollView: {
    flex: 1,
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
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 15,
    flex: 1,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFE5CC',
    color: '#333',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#FF6600',
    borderRadius: 10,
    padding: 15,
    width: 50,
    alignItems: 'center',
  },
  loadingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6600',
    marginLeft: 10,
  },
  noDataSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
  },
  playerInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  playerInfoSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 8,
  },
  playerDetails: {
    fontSize: 16,
    color: '#666',
  },
  chartSection: {
    marginBottom: 30,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 8,
  },
  chartDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  predictionsSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  predictionCard: {
    backgroundColor: '#FFF8F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFE5CC',
  },
  predictionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6600',
    marginBottom: 5,
  },
  predictionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
}); 