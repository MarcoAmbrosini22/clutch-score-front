import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Linking, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HelpScreen() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Qué es el Puntaje Clutch?",
      answer: "El Puntaje Clutch es una métrica que evalúa el rendimiento de un equipo en situaciones de presión, especialmente en los últimos minutos de un partido cerrado. Tiene en cuenta factores como la eficiencia ofensiva, defensiva y la capacidad de mantener la calma bajo presión."
    },
    {
      question: "¿Cómo se calcula el Puntaje Clutch?",
      answer: "El cálculo se basa en múltiples factores estadísticos, incluyendo porcentajes de tiro en situaciones de presión, eficiencia defensiva, manejo de la pelota y capacidad de ejecutar jugadas clave. La fórmula está optimizada para reflejar el verdadero impacto de un equipo en momentos críticos."
    },
    {
      question: "¿Cómo puedo subir mis datos?",
      answer: "Puedes subir tus datos en formato CSV desde la pantalla principal. Asegúrate de que tu archivo incluya las estadísticas necesarias como puntos, asistencias, rebotes y minutos jugados. La aplicación te guiará en el proceso de carga y validación de datos."
    },
    {
      question: "¿Mis datos están seguros?",
      answer: "Sí, todos los datos se almacenan de forma segura y privada. Utilizamos encriptación para proteger tu información y nunca compartimos tus datos con terceros sin tu consentimiento explícito."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleContact = (type: 'email' | 'whatsapp') => {
    if (type === 'email') {
      Linking.openURL('mailto:soporte@clutchscore.com');
    } else {
      Linking.openURL('https://wa.me/1234567890');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#FF6600" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Ayuda y Soporte</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Preguntas Frecuentes</ThemedText>
          
          {faqs.map((faq, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.faqItem}
              onPress={() => toggleFaq(index)}
            >
              <View style={styles.faqHeader}>
                <ThemedText style={styles.faqQuestion}>{faq.question}</ThemedText>
                <FontAwesome 
                  name={expandedFaq === index ? "chevron-up" : "chevron-down"} 
                  size={16} 
                  color="#666666" 
                />
              </View>
              {expandedFaq === index && (
                <ThemedText style={styles.faqAnswer}>{faq.answer}</ThemedText>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Contacto</ThemedText>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContact('email')}
          >
            <View style={styles.contactInfo}>
              <FontAwesome name="envelope" size={20} color="#FF6600" />
              <ThemedText style={styles.contactText}>soporte@clutchscore.com</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContact('whatsapp')}
          >
            <View style={styles.contactInfo}>
              <FontAwesome name="whatsapp" size={20} color="#FF6600" />
              <ThemedText style={styles.contactText}>Chat de Soporte</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recursos</ThemedText>
          
          <TouchableOpacity style={styles.resourceItem}>
            <View style={styles.resourceInfo}>
              <FontAwesome name="book" size={20} color="#FF6600" />
              <ThemedText style={styles.resourceText}>Guía de Usuario</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <View style={styles.resourceInfo}>
              <FontAwesome name="video-camera" size={20} color="#FF6600" />
              <ThemedText style={styles.resourceText}>Tutoriales en Video</ThemedText>
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
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5CC',
    paddingVertical: 15,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5CC',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 15,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5CC',
  },
  resourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 15,
  },
}); 