import { PlayerList } from '@/components/PlayerList';
import { PredictionCard } from '@/components/PredictionCard';
import { ThemedText } from '@/components/ThemedText';
import { apiService, GoalPrediction, Player, SanctionPrediction, SearchPlayersResponse, SimilarPlayersResponse, TacticalRole } from '@/services/api';
import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function VisualizationsScreen() {
  const params = useLocalSearchParams();
  const [playerName, setPlayerName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [goalPrediction, setGoalPrediction] = useState<GoalPrediction | null>(null);
  const [sanctionPrediction, setSanctionPrediction] = useState<SanctionPrediction | null>(null);
  const [tacticalRole, setTacticalRole] = useState<TacticalRole | null>(null);
  const [similarPlayers, setSimilarPlayers] = useState<SimilarPlayersResponse | null>(null);
  const [searchResults, setSearchResults] = useState<SearchPlayersResponse | null>(null);
  
  const [loadingGoals, setLoadingGoals] = useState(false);
  const [loadingSanctions, setLoadingSanctions] = useState(false);
  const [loadingRole, setLoadingRole] = useState(false);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Efecto para manejar parámetros de búsqueda desde el dashboard
  useEffect(() => {
    if (params.searchQuery) {
      const query = params.searchQuery as string;
      setSearchQuery(query);
      setPlayerName(query);
      // Hacer búsqueda automática
      handleSearchPlayersWithQuery(query);
    }
  }, [params.searchQuery]);

  const handleSearchPlayersWithQuery = async (query: string) => {
    setLoadingSearch(true);
    try {
      const results = await apiService.searchPlayers(query, 10);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching players:', error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSearchPlayers = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Por favor ingresa un término de búsqueda');
      return;
    }

    setLoadingSearch(true);
    try {
      const results = await apiService.searchPlayers(searchQuery, 10);
      setSearchResults(results);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron buscar jugadores');
      console.error(error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handlePredictGoals = async () => {
    if (!playerName.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del jugador');
      return;
    }

    setLoadingGoals(true);
    try {
      const prediction = await apiService.predictGoals(playerName);
      setGoalPrediction(prediction);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la predicción de goles');
      console.error(error);
    } finally {
      setLoadingGoals(false);
    }
  };

  const handlePredictSanctions = async () => {
    if (!playerName.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del jugador');
      return;
    }

    setLoadingSanctions(true);
    try {
      const prediction = await apiService.predictSanction(playerName);
      setSanctionPrediction(prediction);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la predicción de sanciones');
      console.error(error);
    } finally {
      setLoadingSanctions(false);
    }
  };

  const handleGetTacticalRole = async () => {
    if (!playerName.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del jugador');
      return;
    }

    setLoadingRole(true);
    try {
      const role = await apiService.getPlayerTacticalRole(playerName);
      setTacticalRole(role);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener el rol táctico');
      console.error(error);
    } finally {
      setLoadingRole(false);
    }
  };

  const handleFindSimilarPlayers = async () => {
    if (!playerName.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del jugador');
      return;
    }

    setLoadingSimilar(true);
    try {
      const players = await apiService.findSimilarPlayers(playerName, 5);
      setSimilarPlayers(players);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron encontrar jugadores similares');
      console.error(error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  const getRiskColor = (riskPercentage: string) => {
    const risk = parseFloat(riskPercentage.replace('%', ''));
    if (risk < 30) return '#28a745';
    if (risk < 70) return '#ffc107';
    return '#dc3545';
  };

  const selectPlayer = (player: Player) => {
    setPlayerName(player.player);
    setSearchResults(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={24} color="#FF6600" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Análisis de Jugadores</ThemedText>
        </View>

        <View style={styles.content}>
          {/* Búsqueda de jugadores */}
          <View style={styles.inputSection}>
            <ThemedText style={styles.sectionTitle}>Buscar Jugadores</ThemedText>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar jugadores..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
              <TouchableOpacity 
                style={styles.searchButton}
                onPress={handleSearchPlayers}
                disabled={loadingSearch}
              >
                <FontAwesome name="search" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Resultados de búsqueda */}
          {searchResults && (
            <PlayerList
              title={`Resultados para "${searchResults.query}" (${searchResults.count})`}
              players={searchResults.players}
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
              onPlayerPress={selectPlayer}
            />
          )}

          {/* Input para nombre del jugador */}
          <View style={styles.inputSection}>
            <ThemedText style={styles.sectionTitle}>Análisis de Jugador</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ingresa el nombre del jugador..."
              value={playerName}
              onChangeText={setPlayerName}
              placeholderTextColor="#999"
            />
          </View>

          {/* Predicciones individuales */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Predicciones</ThemedText>
            
            <TouchableOpacity style={styles.actionButton} onPress={handlePredictGoals}>
              <FontAwesome name="futbol-o" size={20} color="white" />
              <ThemedText style={styles.buttonText}>Predecir Goles</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handlePredictSanctions}>
              <FontAwesome name="exclamation-triangle" size={20} color="white" />
              <ThemedText style={styles.buttonText}>Predecir Sanciones</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleGetTacticalRole}>
              <FontAwesome name="cogs" size={20} color="white" />
              <ThemedText style={styles.buttonText}>Rol Táctico</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleFindSimilarPlayers}>
              <FontAwesome name="users" size={20} color="white" />
              <ThemedText style={styles.buttonText}>Jugadores Similares</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Resultados de predicciones */}
          {goalPrediction && (
            <PredictionCard
              title="Predicción de Goles"
              value={`${goalPrediction.predicted_goals} goles`}
              subtitle={`Real: ${goalPrediction.actual_goals} | ${goalPrediction.position} - ${goalPrediction.team}`}
              icon="futbol-o"
              color="#28a745"
            />
          )}

          {sanctionPrediction && (
            <PredictionCard
              title="Predicción de Sanciones"
              value={sanctionPrediction.sanction_risk_percentage}
              subtitle={`${sanctionPrediction.position} - ${sanctionPrediction.team}`}
              icon="exclamation-triangle"
              color={getRiskColor(sanctionPrediction.sanction_risk_percentage)}
            />
          )}

          {tacticalRole && (
            <PredictionCard
              title="Rol Táctico"
              value={tacticalRole.tactical_role}
              subtitle={`${tacticalRole.position} - ${tacticalRole.team}`}
              icon="cogs"
              color="#FF6600"
            />
          )}

          {/* Jugadores similares */}
          {similarPlayers && (
            <PlayerList
              title={`Jugadores Similares a ${similarPlayers.target_player} (${similarPlayers.count})`}
              players={similarPlayers.similar_players}
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
  inputSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 15,
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
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFE5CC',
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#FF6600',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#FF6600',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  playerInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  similarPlayerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
}); 