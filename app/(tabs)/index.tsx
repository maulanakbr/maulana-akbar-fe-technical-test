import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/index';
import { fetchMovies, toggleFavorite } from '@/store/slices/movies-slice';
import { toggleTheme } from '@/store/slices/theme-slice';
import MovieCard from '@/components/movie-card';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery, movies]);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkTitle]}>Movie List</Text>
      <TextInput
        style={[styles.searchInput, darkMode && styles.darkSearchInput]}
        placeholder="Search movies..."
        placeholderTextColor={darkMode ? '#888' : '#AAA'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredMovies}
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
        ListEmptyComponent={<Text style={[styles.noResults, darkMode && styles.darkNoResults]}>No movies found</Text>}
      />
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleLabel, darkMode && styles.darkToggleLabel]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={() => dispatch(toggleTheme())}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 16 },
  darkContainer: { backgroundColor: '#121212' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 16 },
  darkTitle: { color: '#FFF' },
  searchInput: { backgroundColor: '#F0F0F0', color: '#000', padding: 10, borderRadius: 8, fontSize: 16, marginBottom: 16 },
  darkSearchInput: { backgroundColor: '#1E1E1E', color: '#FFF' },
  noResults: { fontSize: 16, color: '#000', textAlign: 'center', marginTop: 20 },
  darkNoResults: { color: '#AAA' },
  toggleContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  toggleLabel: { fontSize: 18, color: '#000', marginRight: 8 },
  darkToggleLabel: { color: '#FFF' },
});
