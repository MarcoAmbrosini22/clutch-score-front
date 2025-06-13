# 🏆 Clutch Score

Una aplicación móvil moderna desarrollada con **React Native** y **Expo** para el seguimiento y análisis de rendimiento en videojuegos.

## ✨ Características Principales

### 🔐 **Sistema de Autenticación Completo**
- **Registro de usuarios** con validación completa
- **Inicio de sesión** seguro y persistente
- **Gestión de estado** con Context API
- **Persistencia de sesión** con AsyncStorage
- **Navegación protegida** y automática

### 🎨 **Diseño Moderno y Atractivo**
- **Logo personalizado** con trofeo dorado y efectos visuales
- **Paleta de colores** naranja profesional
- **Interfaz intuitiva** y responsive
- **Animaciones y sombras** modernas
- **Tipografía** optimizada para legibilidad

### 📱 **Pantallas Desarrolladas**
- **Pantalla de Bienvenida** con redirección automática
- **Login** con validaciones y estados de carga
- **Registro** con validación de formularios
- **Dashboard principal** con estadísticas
- **Navegación segura** entre pantallas

## 🚀 Tecnologías Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **Expo Router** - Navegación basada en archivos
- **AsyncStorage** - Almacenamiento local
- **Ionicons** - Iconografía
- **Context API** - Gestión de estado global

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- Dispositivo móvil con Expo Go (opcional)

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/clutch-score.git
cd clutch-score
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npx expo start
```

4. **Ejecutar la aplicación**
- **Móvil**: Escanea el código QR con Expo Go
- **Web**: Presiona `w` en la terminal
- **Android**: Presiona `a` (requiere Android Studio)
- **iOS**: Presiona `i` (requiere Xcode - solo macOS)

## 🏗️ Estructura del Proyecto

```
clutch-score/
├── app/                    # Pantallas principales
│   ├── (tabs)/            # Navegación por pestañas
│   │   └── index.tsx      # Dashboard principal
│   ├── _layout.tsx        # Layout raíz
│   ├── index.tsx          # Pantalla inicial
│   ├── login.tsx          # Pantalla de login
│   └── register.tsx       # Pantalla de registro
├── components/            # Componentes reutilizables
│   └── ClutchLogo.tsx     # Logo personalizado
├── contexts/              # Contextos de React
│   └── AuthContext.tsx    # Contexto de autenticación
├── assets/                # Recursos estáticos
└── package.json           # Dependencias del proyecto
```

## 🎯 Funcionalidades Implementadas

### Autenticación
- [x] Registro de usuario con validación
- [x] Inicio de sesión
- [x] Persistencia de sesión
- [x] Logout con confirmación
- [x] Protección de rutas

### Interfaz de Usuario
- [x] Logo animado con efectos visuales
- [x] Diseño responsive
- [x] Paleta de colores naranja consistente
- [x] Formularios estilizados
- [x] Estados de carga
- [x] Navegación fluida

### Experiencia de Usuario
- [x] Redirección automática según estado de auth
- [x] Validaciones en tiempo real
- [x] Mensajes de error descriptivos
- [x] Prevención de navegación múltiple
- [x] Feedback visual en todas las acciones

## 🔧 Configuración de Desarrollo

### Scripts disponibles
```bash
npm start          # Inicia Expo
npm run android    # Ejecuta en Android
npm run ios        # Ejecuta en iOS
npm run web        # Ejecuta en navegador
npm run lint       # Ejecuta ESLint
```

### Variables de entorno
Crea un archivo `.env` para configuraciones específicas:
```env
API_URL=tu_api_url_aqui
```

## 🎨 Paleta de Colores

- **Naranja principal**: `#FF6600`
- **Naranja claro**: `#FF8533`
- **Dorado**: `#FFD700`
- **Fondo claro**: `#FFF4E6`
- **Bordes**: `#FFE5CC`
- **Texto**: `#333333`

## 📱 Capturas de Pantalla

*[Agregar capturas de pantalla aquí]*

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Marco** - Desarrollador Principal

## 🙏 Agradecimientos

- Expo Team por la excelente plataforma
- React Native Community
- Iconos de Ionicons

---

⭐ ¡No olvides darle una estrella al proyecto si te gustó!
