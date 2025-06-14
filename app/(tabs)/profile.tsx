import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Perfil</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#FF6600', '#FF8533']}
            style={styles.profileGradient}
          >
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={40} color="white" />
            </View>
            <ThemedText style={styles.profileName}>{user?.email}</ThemedText>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/about')}
          >
            <View style={styles.menuInfo}>
              <FontAwesome name="info-circle" size={20} color="#FF6600" />
              <ThemedText style={styles.menuText}>Acerca de</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/settings')}
          >
            <View style={styles.menuInfo}>
              <FontAwesome name="cog" size={20} color="#FF6600" />
              <ThemedText style={styles.menuText}>Configuración</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/help')}
          >
            <View style={styles.menuInfo}>
              <FontAwesome name="question-circle" size={20} color="#FF6600" />
              <ThemedText style={styles.menuText}>Ayuda y Soporte</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LinearGradient
            colors={['#FF6600', '#FF8533']}
            style={styles.logoutGradient}
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
            <ThemedText style={styles.logoutText}>Cerrar Sesión</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6600',
  },
  profileCard: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#FF6600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    marginBottom: 24,
  },
  profileGradient: {
    padding: 24,
    alignItems: 'center',
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#FFE5CC',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5CC',
  },
  menuInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  logoutButton: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#FF6600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
}); 