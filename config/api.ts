// Configuración de la API
export const API_CONFIG = {
  // Cambiar esta IP por la IP correcta donde está corriendo el backend
  BASE_URL: 'http://192.168.1.3:8000',
  
  // Timeout para las peticiones (en milisegundos)
  TIMEOUT: 10000,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// Función para obtener la URL completa de un endpoint
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Función para validar si la URL del backend es accesible
export const validateBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
      headers: API_CONFIG.DEFAULT_HEADERS,
    });
    return response.ok;
  } catch (error) {
    console.error('Error connecting to backend:', error);
    return false;
  }
}; 