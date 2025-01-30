import type { Movie } from '@/domain/entities/movie';
import { MovieRepository } from '@/domain/repositories/movie-repository';
import moviesData from '../../infrastructure/data/movies.json';

export class MovieService implements MovieRepository {
  private movies: Movie[] = moviesData.movies;

  async getMovies(): Promise<Movie[]> {
    return this.movies;
  }

  async toggleFavorite(movieId: number): Promise<void> {
    this.movies = this.movies.map((movie) => (movie.id === movieId ? { ...movie, isFavourite: !movie.isFavorite } : movie));
  }
}
