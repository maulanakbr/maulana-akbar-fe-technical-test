import type { Movie } from '../entities/movie';

export interface MovieRepository {
  getMovies(): Promise<Movie[]>;
  toggleFavorite(movieId: number): Promise<void>;
}
