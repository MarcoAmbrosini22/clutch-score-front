import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [dataSyncEnabled, setDataSyncEnabled] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#FF6600" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Configuración</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Preferencias</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <FontAwesome name="bell" size={20} color="#FF6600" />
              <ThemedText style={styles.settingText}>Notificaciones</ThemedText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#FFE5CC', true: '#FFB380' }}
              thumbColor={notificationsEnabled ? '#FF6600' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <FontAwesome name="moon-o" size={20} color="#FF6600" />
              <ThemedText style={styles.settingText}>Modo Oscuro</ThemedText>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#FFE5CC', true: '#FFB380' }}
              thumbColor={darkModeEnabled ? '#FF6600' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <FontAwesome name="refresh" size={20} color="#FF6600" />
              <ThemedText style={styles.settingText}>Sincronización Automática</ThemedText>
            </View>
            <Switch
              value={dataSyncEnabled}
              onValueChange={setDataSyncEnabled}
              trackColor={{ false: '#FFE5CC', true: '#FFB380' }}
              thumbColor={dataSyncEnabled ? '#FF6600' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Datos</ThemedText>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <FontAwesome name="download" size={20} color="#FF6600" />
              <ThemedText style={styles.settingText}>Exportar Datos</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <FontAwesome name="trash" size={20} color="#FF6600" />
              <ThemedText style={styles.settingText}>Borrar Datos Locales</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Cuenta</ThemedText>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <FontAwesome name="user" size={20} color="#FF6600" />
              <ThemedText style={styles.settingText}>Cambiar Contraseña</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <FontAwesome name="sign-out" size={20} color="#FF6600" />
              <ThemedText style={styles.settingText}>Cerrar Sesión</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
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
  section: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFE5CC',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5CC',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 15,
  },
}); 