import { MovieRepository } from '../repositories/movie-repository';

export class ToggleFavoriteUsecase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(movieId: number) {
    await this.movieRepository.toggleFavorite(movieId);
  }
}
