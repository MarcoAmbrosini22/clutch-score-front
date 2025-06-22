import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Usar la interfaz Player del backend
interface Player {
  player: string;
  position: string;
  team: string;
  clutch_score?: number;
}

interface PlayerListProps {
  title: string;
  players: Player[];
  loading?: boolean;
  onPlayerPress?: (player: Player) => void;
  renderPlayerInfo?: (player: Player) => React.ReactNode;
}

export function PlayerList({ 
  title, 
  players, 
  loading = false, 
  onPlayerPress,
  renderPlayerInfo 
}: PlayerListProps) {
  if (loading) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <View style={styles.loadingContainer}>
          <ThemedText style={styles.loadingText}>Cargando jugadores...</ThemedText>
        </View>
      </View>
    );
  }

  if (players.length === 0) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <View style={styles.emptyContainer}>
          <FontAwesome name="users" size={24} color="#CCC" />
          <ThemedText style={styles.emptyText}>No se encontraron jugadores</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {players.map((player, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.playerCard}
          onPress={() => onPlayerPress?.(player)}
          disabled={!onPlayerPress}
        >
          <View style={styles.playerHeader}>
            <FontAwesome name="user" size={20} color="#FF6600" />
            <ThemedText style={styles.playerName}>{player.player}</ThemedText>
          </View>
          {renderPlayerInfo && (
            <View style={styles.playerInfo}>
              {renderPlayerInfo(player)}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 15,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#CCC',
    marginTop: 10,
  },
  playerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#FFE5CC',
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  playerInfo: {
    marginLeft: 30,
  },
}); 