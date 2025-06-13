import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ClutchLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function ClutchLogo({ size = 'medium', showText = true }: ClutchLogoProps) {
  const logoSize = size === 'large' ? 80 : size === 'medium' ? 60 : 40;
  const textSize = size === 'large' ? 32 : size === 'medium' ? 24 : 18;
  const containerSize = size === 'large' ? 100 : size === 'medium' ? 80 : 50;

  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer, { width: containerSize, height: containerSize }]}>
        <Ionicons 
          name="trophy" 
          size={logoSize} 
          color="#FFD700" 
          style={styles.icon}
        />
        <View style={styles.sparkle1}>
          <Ionicons name="star" size={14} color="#FF6600" />
        </View>
        <View style={styles.sparkle2}>
          <Ionicons name="star" size={10} color="#FF8533" />
        </View>
        <View style={styles.sparkle3}>
          <Ionicons name="star" size={6} color="#FFD700" />
        </View>
      </View>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.brandText, { fontSize: textSize }]}>
            <Text style={styles.clutchText}>Clutch</Text>
            <Text style={styles.scoreText}> Score</Text>
          </Text>
          <Text style={styles.tagline}>Tu rendimiento en tus manos</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  icon: {
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  sparkle1: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  sparkle2: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  sparkle3: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  textContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  brandText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clutchText: {
    color: '#FF6600',
  },
  scoreText: {
    color: '#333',
  },
  tagline: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
}); 