import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  test('Testa se é exibindo No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundFavorite = getByText('No favorite pokemon found');

    expect(notFoundFavorite).toBeInTheDocument();
  });
});
