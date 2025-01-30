import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/index';
import { toggleFavorite } from '@/store/slices/movies-slice';
import MovieCard from '@/components/movie-card';
import NotFound from '@/components/not-found';

export default function FavoritesScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, darkMode ? styles.darkText : styles.text]}>Favorite Movies</Text>
      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isFavorite = favorites.includes(item.id);

          return (
            <MovieCard
              item={item}
              darkMode={darkMode}
              isFavorite={isFavorite}
              handleToggle={() => dispatch(toggleFavorite(item.id))}
            />
          );
        }}
        ListEmptyComponent={
          <NotFound
            darkMode={darkMode}
            info="No Favorite Selected"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  darkContainer: { backgroundColor: '#121212' },
  lightContainer: { backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  darkText: { color: '#FFF' },
  text: { color: '#000' },
});
