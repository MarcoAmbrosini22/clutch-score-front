import { API_CONFIG, getApiUrl } from '@/config/api';

// Tipos de respuesta actualizados según el backend
export interface HealthCheck {
  status: string;
  models_loaded: boolean;
  players_count: number;
  timestamp: string;
}

export interface Player {
  player: string;
  position: string;
  team: string;
  clutch_score?: number;
}

export interface SearchPlayersResponse {
  players: Player[];
  count: number;
  query: string;
}

export interface GoalPrediction {
  player: string;
  predicted_goals: number;
  actual_goals: number;
  position: string;
  team: string;
}

export interface SanctionPrediction {
  player: string;
  sanction_risk: number;
  sanction_risk_percentage: string;
  position: string;
  team: string;
}

export interface HighPotentialPlayersResponse {
  players: Player[];
  count: number;
}

export interface TacticalRole {
  player: string;
  tactical_role: string;
  position: string;
  team: string;
}

export interface SimilarPlayersResponse {
  target_player: string;
  similar_players: Player[];
  count: number;
}

// Roles tácticos disponibles
export const TACTICAL_ROLES = [
  "Defensor Agresivo",
  "Mediocampista Creativo", 
  "Delantero Finalizador",
  "Jugador de Relevo",
  "Mediocampista Defensivo",
  "Defensor Sólido",
  "Arquero Seguro"
];

// Posiciones disponibles
export const POSITIONS = [
  "Forward",
  "Midfielder", 
  "Defender",
  "Goalkeeper"
];

// Funciones para llamar a los endpoints
export const apiService = {
  // Health check
  async healthCheck(): Promise<HealthCheck> {
    try {
      const response = await fetch(getApiUrl('/health'), {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as HealthCheck;
      return data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  },

  // Buscar jugadores
  async searchPlayers(query: string, limit: number = 10): Promise<SearchPlayersResponse> {
    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(getApiUrl(`/search_players/${encodedQuery}?limit=${limit}`), {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as SearchPlayersResponse;
      return data;
    } catch (error) {
      console.error('Error searching players:', error);
      throw error;
    }
  },

  // Predecir goles para un jugador
  async predictGoals(playerName: string): Promise<GoalPrediction> {
    try {
      const encodedName = encodeURIComponent(playerName);
      const response = await fetch(getApiUrl(`/predict_goals/${encodedName}`), {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as GoalPrediction;
      return data;
    } catch (error) {
      console.error('Error predicting goals:', error);
      throw error;
    }
  },

  // Predecir sanciones para un jugador
  async predictSanction(playerName: string): Promise<SanctionPrediction> {
    try {
      const encodedName = encodeURIComponent(playerName);
      const response = await fetch(getApiUrl(`/predict_sanction/${encodedName}`), {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as SanctionPrediction;
      return data;
    } catch (error) {
      console.error('Error predicting sanctions:', error);
      throw error;
    }
  },

  // Encontrar jugadores con alto potencial
  async findHighPotentialPlayers(topN: number = 10): Promise<HighPotentialPlayersResponse> {
    try {
      const response = await fetch(getApiUrl(`/find_high_potential_players/?top_n=${topN}`), {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as HighPotentialPlayersResponse;
      return data;
    } catch (error) {
      console.error('Error finding high potential players:', error);
      throw error;
    }
  },

  // Obtener rol táctico de un jugador
  async getPlayerTacticalRole(playerName: string): Promise<TacticalRole> {
    try {
      const encodedName = encodeURIComponent(playerName);
      const response = await fetch(getApiUrl(`/player_tactical_role/${encodedName}`), {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as TacticalRole;
      return data;
    } catch (error) {
      console.error('Error getting tactical role:', error);
      throw error;
    }
  },

  // Encontrar jugadores similares
  async findSimilarPlayers(playerName: string, n: number = 5): Promise<SimilarPlayersResponse> {
    try {
      const encodedName = encodeURIComponent(playerName);
      const response = await fetch(getApiUrl(`/similar_players/${encodedName}?n=${n}`), {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as SimilarPlayersResponse;
      return data;
    } catch (error) {
      console.error('Error finding similar players:', error);
      throw error;
    }
  }
}; 