import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '@/contexts/AuthContext';
import ClutchLogo from '@/components/ClutchLogo';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLogin = async () => {
    if (!email || !password || isNavigating) {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos');
      }
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        setIsNavigating(true);
        Alert.alert('Éxito', 'Inicio de sesión exitoso', [
          { text: 'OK', onPress: () => router.replace('/(tabs)') }
        ]);
      } else {
        Alert.alert('Error', 'Error al iniciar sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al iniciar sesión');
    }
  };

  const handleNavigateToRegister = () => {
    if (isNavigating || isLoading) return;
    setIsNavigating(true);
    router.push('/register');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoSection}>
          <ClutchLogo size="large" />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Bienvenido de vuelta a Clutch Score</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity
            style={[styles.loginButton, (isLoading || isNavigating) && styles.disabledButton]}
            onPress={handleLogin}
            disabled={isLoading || isNavigating}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Iniciando sesión...' : isNavigating ? 'Ingresando...' : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={handleNavigateToRegister} disabled={isLoading || isNavigating}>
              <Text style={[styles.registerLink, (isLoading || isNavigating) && { opacity: 0.5 }]}>
                Regístrate aquí
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 32,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 2,
    borderColor: '#FFE5CC',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#FF6600',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#FF6600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#FFE5CC',
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#333',
    shadowColor: '#FF6600',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  loginButton: {
    backgroundColor: '#FF6600',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    shadowColor: '#FF6600',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  disabledButton: {
    backgroundColor: '#FFB84D',
    shadowOpacity: 0.1,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    fontSize: 16,
    color: '#FF6600',
    fontWeight: '700',
  },
}); 