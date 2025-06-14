import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6600',
        tabBarInactiveTintColor: '#FFB84D',
        tabBarStyle: {
          backgroundColor: '#FFF4E6',
          borderTopWidth: 2,
          borderTopColor: '#FFE5CC',
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#FFF4E6',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 2,
          borderBottomColor: '#FFE5CC',
        },
        headerTitleStyle: {
          color: '#FF6600',
          fontSize: 20,
          fontWeight: 'bold',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerTitle: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
} 