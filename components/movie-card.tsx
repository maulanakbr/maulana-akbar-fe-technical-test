import { Movie } from '@/domain/entities/movie';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface MovieCardProps {
  item: Movie;
  darkMode: boolean;
  isFavorite?: boolean;
  handleToggle: () => void;
}

export default function MovieCard({ item, darkMode, isFavorite, handleToggle }: MovieCardProps) {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(120);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.card, darkMode && styles.darkCard, animatedStyle]}>
      <TouchableOpacity
        style={styles.info}
        onPress={() => router.push(`/movie/${item.id}`)}
      >
        <Text style={[styles.movieTitle, darkMode && styles.darkMovieTitle]}>{item.title}</Text>
        <Text style={[styles.genre, darkMode && styles.darkGenre]}>
          {item.genre} | {item.releaseYear}
        </Text>
        <Text style={[styles.rating, darkMode && styles.darkRating]}>⭐ {item.rating}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
        onPress={handleToggle}
      >
        <Text style={styles.favoriteText}>{isFavorite ? '★' : '☆'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 10, padding: 12, marginBottom: 12, alignItems: 'center' },
  darkCard: { backgroundColor: '#1E1E1E' },
  movieTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  darkMovieTitle: { color: '#FFF' },
  genre: { fontSize: 14, color: '#666' },
  darkGenre: { color: '#BBBBBB' },
  rating: { fontSize: 14, fontWeight: 'bold', color: '#FFD700', marginTop: 4 },
  darkRating: { color: '#FFD700' },
  favoriteButton: { width: 30, height: 30, borderRadius: 100, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center' },
  favoriteActive: { backgroundColor: '#FFD700' },
  favoriteText: { fontSize: 19, textAlign: 'center', color: '#FFF' },
  info: { flex: 1, marginLeft: 12 },
});
