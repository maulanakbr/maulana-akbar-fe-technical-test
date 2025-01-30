import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncStorageRepository } from '@/infrastructure/storage/async-storage-repository';
import { Movie } from '@/domain/entities/movie';

const movieRepository = new AsyncStorageRepository();

interface MoviesState {
  movies: Movie[];
  favorites: number[];
}

const initialState: MoviesState = {
  movies: [],
  favorites: [],
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await movieRepository.getMovies();
  return response || [];
});

export const toggleFavorite = createAsyncThunk('movies/toggleFavorite', async (movieId: number, { dispatch }) => {
  await movieRepository.toggleFavorite(movieId);
  dispatch(fetchMovies());
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.favorites = action.payload.filter((movie: Movie) => movie.isFavorite).map((movie: Movie) => movie.id);
    });
  },
});

export default moviesSlice.reducer;
