import { apiService, GoalPrediction, HighPotentialPlayersResponse, SanctionPrediction, SearchPlayersResponse, SimilarPlayersResponse, TacticalRole } from '@/services/api';
import { useCallback, useState } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi() {
  const [goalPrediction, setGoalPrediction] = useState<ApiState<GoalPrediction>>({
    data: null,
    loading: false,
    error: null,
  });

  const [sanctionPrediction, setSanctionPrediction] = useState<ApiState<SanctionPrediction>>({
    data: null,
    loading: false,
    error: null,
  });

  const [tacticalRole, setTacticalRole] = useState<ApiState<TacticalRole>>({
    data: null,
    loading: false,
    error: null,
  });

  const [similarPlayers, setSimilarPlayers] = useState<ApiState<SimilarPlayersResponse>>({
    data: null,
    loading: false,
    error: null,
  });

  const [highPotentialPlayers, setHighPotentialPlayers] = useState<ApiState<HighPotentialPlayersResponse>>({
    data: null,
    loading: false,
    error: null,
  });

  const [searchResults, setSearchResults] = useState<ApiState<SearchPlayersResponse>>({
    data: null,
    loading: false,
    error: null,
  });

  const searchPlayers = useCallback(async (query: string, limit: number = 10) => {
    setSearchResults(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiService.searchPlayers(query, limit);
      setSearchResults({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setSearchResults(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const predictGoals = useCallback(async (playerName: string) => {
    setGoalPrediction(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiService.predictGoals(playerName);
      setGoalPrediction({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setGoalPrediction(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const predictSanctions = useCallback(async (playerName: string) => {
    setSanctionPrediction(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiService.predictSanction(playerName);
      setSanctionPrediction({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setSanctionPrediction(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const getTacticalRole = useCallback(async (playerName: string) => {
    setTacticalRole(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiService.getPlayerTacticalRole(playerName);
      setTacticalRole({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setTacticalRole(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const findSimilarPlayers = useCallback(async (playerName: string, n: number = 5) => {
    setSimilarPlayers(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiService.findSimilarPlayers(playerName, n);
      setSimilarPlayers({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setSimilarPlayers(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const findHighPotentialPlayers = useCallback(async (topN: number = 10) => {
    setHighPotentialPlayers(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiService.findHighPotentialPlayers(topN);
      setHighPotentialPlayers({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setHighPotentialPlayers(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  const clearGoalPrediction = useCallback(() => {
    setGoalPrediction({ data: null, loading: false, error: null });
  }, []);

  const clearSanctionPrediction = useCallback(() => {
    setSanctionPrediction({ data: null, loading: false, error: null });
  }, []);

  const clearTacticalRole = useCallback(() => {
    setTacticalRole({ data: null, loading: false, error: null });
  }, []);

  const clearSimilarPlayers = useCallback(() => {
    setSimilarPlayers({ data: null, loading: false, error: null });
  }, []);

  const clearHighPotentialPlayers = useCallback(() => {
    setHighPotentialPlayers({ data: null, loading: false, error: null });
  }, []);

  const clearSearchResults = useCallback(() => {
    setSearchResults({ data: null, loading: false, error: null });
  }, []);

  const clearAll = useCallback(() => {
    clearGoalPrediction();
    clearSanctionPrediction();
    clearTacticalRole();
    clearSimilarPlayers();
    clearHighPotentialPlayers();
    clearSearchResults();
  }, [clearGoalPrediction, clearSanctionPrediction, clearTacticalRole, clearSimilarPlayers, clearHighPotentialPlayers, clearSearchResults]);

  return {
    // Estados
    goalPrediction,
    sanctionPrediction,
    tacticalRole,
    similarPlayers,
    highPotentialPlayers,
    searchResults,
    
    // Funciones
    searchPlayers,
    predictGoals,
    predictSanctions,
    getTacticalRole,
    findSimilarPlayers,
    findHighPotentialPlayers,
    
    // Funciones de limpieza
    clearGoalPrediction,
    clearSanctionPrediction,
    clearTacticalRole,
    clearSimilarPlayers,
    clearHighPotentialPlayers,
    clearSearchResults,
    clearAll,
  };
} 