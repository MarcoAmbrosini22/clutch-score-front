# Configuración de la API - Clutch Score Frontend

## 📋 Descripción
Este documento explica cómo configurar la conexión entre el frontend de React Native y el backend de FastAPI.

## 🔧 Configuración del Backend

### 1. Verificar que el backend esté corriendo
El backend debe estar ejecutándose en una IP local con el formato:
```
http://192.168.1.3:8000
```

### 2. Endpoints disponibles
El frontend está configurado para consumir los siguientes endpoints:

- `GET /health` - Verificar conexión y estado del backend
- `GET /search_players/{query}?limit=10` - Buscar jugadores
- `GET /predict_goals/{player_name}` - Predicción de goles
- `GET /predict_sanction/{player_name}` - Predicción de sanciones  
- `GET /find_high_potential_players/?top_n=10` - Jugadores con alto potencial
- `GET /player_tactical_role/{player_name}` - Rol táctico del jugador
- `GET /similar_players/{player_name}?n=5` - Jugadores similares

## 🔧 Configuración del Frontend

### 1. Actualizar la IP del backend
Edita el archivo `config/api.ts` y cambia la IP en la línea:
```typescript
BASE_URL: 'http://192.168.1.3:8000', // Tu IP real
```

### 2. Obtener tu IP local
Para encontrar tu IP local:

**Windows:**
```bash
ipconfig
```

**Mac/Linux:**
```bash
ifconfig
```

Busca la IP que comience con `192.168.` o `10.0.`

### 3. Verificar conectividad
El frontend incluye un componente `ConnectionStatus` que muestra el estado de conexión en la esquina superior derecha de la pantalla de visualizaciones.

## 📱 Uso en el Emulador/Dispositivo

### Para Emulador Android:
- Usa `10.0.2.2` en lugar de `localhost` para acceder a tu máquina host
- Ejemplo: `http://10.0.2.2:8000`

### Para Dispositivo Físico:
- Asegúrate de que el dispositivo esté en la misma red WiFi
- Usa la IP local de tu máquina
- Ejemplo: `http://192.168.1.3:8000`

### Para iOS Simulator:
- Usa `localhost` o la IP local de tu máquina
- Ejemplo: `http://localhost:8000` o `http://192.168.1.3:8000`

## 🚀 Funcionalidades Implementadas

### Pantalla de Visualizaciones (`app/visualizations.tsx`)
- **Búsqueda de jugadores**: Busca jugadores por nombre
- **Análisis individual**: Predicciones para un jugador específico
- **Visualización de resultados**: Componentes reutilizables
- **Indicador de estado de conexión**: Muestra estado del backend

### Dashboard (`app/(tabs)/index.tsx`)
- Acceso rápido a análisis de jugadores
- Botones de acción rápida para cada tipo de predicción

### Componentes Reutilizables
- `PredictionCard`: Muestra predicciones con iconos y colores
- `PlayerList`: Lista de jugadores con información personalizada
- `ConnectionStatus`: Indicador de estado de conexión

## 📊 Formatos de Respuesta del Backend

### Health Check
```json
{
  "status": "healthy",
  "models_loaded": true,
  "players_count": 1234,
  "timestamp": "2024-01-15T10:30:00"
}
```

### Búsqueda de Jugadores
```json
{
  "players": [
    {
      "player": "Carlos Bacca",
      "position": "Forward", 
      "team": "atletico junior",
      "clutch_score": 478
    }
  ],
  "count": 5,
  "query": "carlos"
}
```

### Predicción de Goles
```json
{
  "player": "Carlos Bacca",
  "predicted_goals": 7.5,
  "actual_goals": 8,
  "position": "Forward",
  "team": "atletico junior"
}
```

### Predicción de Sanciones
```json
{
  "player": "Juan Pérez",
  "sanction_risk": 0.75,
  "sanction_risk_percentage": "75.0%",
  "position": "Midfielder",
  "team": "club name"
}
```

### Jugadores con Alto Potencial
```json
{
  "players": [
    {
      "player": "Carlos Bacca",
      "position": "Forward",
      "team": "atletico junior", 
      "clutch_score": 478
    }
  ],
  "count": 10
}
```

### Rol Táctico
```json
{
  "player": "Carlos Bacca",
  "tactical_role": "Delantero Finalizador",
  "position": "Forward",
  "team": "atletico junior"
}
```

### Jugadores Similares
```json
{
  "target_player": "Carlos Bacca",
  "similar_players": [
    {
      "player": "Marco Pérez",
      "position": "Forward",
      "team": "atletico junior",
      "clutch_score": 109
    }
  ],
  "count": 5
}
```

## 🎯 Roles Tácticos Disponibles
- "Defensor Agresivo"
- "Mediocampista Creativo"
- "Delantero Finalizador"
- "Jugador de Relevo"
- "Mediocampista Defensivo"
- "Defensor Sólido"
- "Arquero Seguro"

## 📊 Posiciones Disponibles
- "Forward"
- "Midfielder"
- "Defender"
- "Goalkeeper"

## 🔍 Troubleshooting

### Error de conexión
1. Verifica que el backend esté corriendo
2. Confirma la IP en `config/api.ts`
3. Asegúrate de que el dispositivo/emulador esté en la misma red
4. Revisa el indicador de conexión en la app

### Error de CORS
Si el backend devuelve errores de CORS, asegúrate de que el backend permita peticiones desde el origen de la app.

### Timeout de peticiones
El timeout está configurado en 10 segundos. Si las peticiones tardan más, puedes ajustarlo en `config/api.ts`.

## 📝 Notas Importantes

- El frontend usa `fetch` nativo de React Native
- Todas las peticiones incluyen headers apropiados
- Los nombres de jugadores se codifican automáticamente para URLs
- Los errores se manejan con alertas y logging en consola
- El diseño es responsivo y sigue la paleta de colores de la app (#FF6600)
- La app incluye funcionalidad de búsqueda de jugadores
- Los resultados se muestran con información detallada (posición, equipo, clutch score) 