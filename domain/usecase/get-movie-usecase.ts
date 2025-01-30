import { MovieRepository } from '../repositories/movie-repository';

export class GetMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute() {
    return await this.movieRepository.getMovies();
  }
}
