import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NotFoundProps {
  darkMode: boolean;
  info: string;
}

export default function NotFound({ darkMode, info }: NotFoundProps) {
  return <Text style={[styles.notFound, darkMode ? styles.darkText : styles.lightText]}>{info}</Text>;
}

const styles = StyleSheet.create({
  notFound: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  darkText: {
    color: '#FFF',
  },
  lightText: {
    color: '#000',
  },
});
