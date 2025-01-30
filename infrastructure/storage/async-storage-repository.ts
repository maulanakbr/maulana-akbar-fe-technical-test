import { Movie } from '@/domain/entities/movie';
import { MovieRepository } from '@/domain/repositories/movie-repository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moviesData from '@/infrastructure/data/movies.json'; // Import JSON file

export class AsyncStorageRepository implements MovieRepository {
  private storageKey = 'movies';

  async getMovies(): Promise<Movie[]> {
    try {
      const storedMovies = await AsyncStorage.getItem(this.storageKey);

      if (storedMovies) {
        const parsedMovies = JSON.parse(storedMovies);

        if (parsedMovies.movies) {
          return parsedMovies.movies;
        }

        return parsedMovies;
      }

      await this.saveMovies(moviesData.movies);
      return moviesData.movies;
    } catch (error) {
      console.error('Error retrieving movies:', error);
      return [];
    }
  }

  async saveMovies(movies: Movie[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(movies));
    } catch (error) {
      console.error('Error saving movies:', error);
    }
  }

  async toggleFavorite(movieId: number): Promise<void> {
    try {
      const movies = await this.getMovies();
      const updatedMovies = movies.map((movie) => (movie.id === movieId ? { ...movie, isFavorite: !movie.isFavorite } : movie));
      await this.saveMovies(updatedMovies);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }
}
