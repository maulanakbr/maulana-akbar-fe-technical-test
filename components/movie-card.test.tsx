import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard from './movie-card';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('MovieCard Component', () => {
  const mockMovie = {
    id: 1,
    title: 'Psycho',
    description: 'A secretary embezzles money and checks into a remote motel run by a disturbed man.',
    releaseYear: 1960,
    genre: 'Horror',
    rating: 8.5,
    isFavorite: false,
    imageUrl: '/81d8oyEFgj7FlxJqSDXWr8JH8kV.jpg',
  };

  it('renders correctly with movie details', () => {
    const { getByText } = render(
      <MovieCard
        item={mockMovie}
        darkMode={false}
        isFavorite={false}
        handleToggle={() => {}}
      />
    );

    expect(getByText('Psycho')).toBeTruthy();
    expect(getByText('Horror | 1960')).toBeTruthy();
    expect(getByText('⭐ 8.5')).toBeTruthy();
  });

  it('calls handleToggle when favorite button is pressed', () => {
    const mockToggle = jest.fn();
    const { getByText } = render(
      <MovieCard
        item={mockMovie}
        darkMode={false}
        isFavorite={false}
        handleToggle={mockToggle}
      />
    );

    fireEvent.press(getByText('☆')); // Favorite button
    expect(mockToggle).toHaveBeenCalled();
  });

  it('navigates to movie details page when pressed', () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { getByText } = render(
      <MovieCard
        item={mockMovie}
        darkMode={false}
        isFavorite={false}
        handleToggle={() => {}}
      />
    );

    fireEvent.press(getByText('Psycho'));
    expect(mockRouter.push).toHaveBeenCalledWith('/movie/1');
  });
});
