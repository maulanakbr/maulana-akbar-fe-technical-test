import { Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import NotFound from '@/components/not-found';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = useSelector((state: RootState) => state.movies.movies.find((m) => m.id === Number(id)));
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  if (!movie) {
    return (
      <NotFound
        darkMode={darkMode}
        info="Movie Not Found"
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${movie.imageUrl}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>{movie.title}</Text>
      <Text style={[styles.genre, darkMode ? styles.darkText : styles.lightText]}>
        {movie.genre} | {movie.releaseYear}
      </Text>
      <Text style={[styles.rating, { color: '#FFD700' }]}>⭐ {movie.rating}</Text>
      <Text style={[styles.description, darkMode ? styles.darkText : styles.lightText]}>{movie.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  notFound: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  darkText: {
    color: '#FFF',
  },
  lightText: {
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  genre: {
    fontSize: 16,
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
});
