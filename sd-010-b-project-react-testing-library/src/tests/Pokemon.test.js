import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import Pokedex from '../components/Pokedex';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const mockedPokemon = pokemons[0];
const { id, name, type, image, averageWeight } = mockedPokemon;
const { measurementUnit, value } = averageWeight;

describe('Testa o componente Pokemon', () => {
  test('Testa se é renderizado card com informaçoes dos pokemons', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId('pokemon-name')).toHaveTextContent(name);
  });

  test('Testa se o tipo correto do pokemon é mostrado', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId('pokemon-type')).toHaveTextContent(type);
  });

  test('Testa se o peso é exibido no formato correto', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const average = `Average weight: ${value} ${measurementUnit}`;
    expect(getByTestId('pokemon-weight')).toHaveTextContent(average);
  });

  test('Testa se a imagem do Pokemon é exibida', () => {
    const { getByRole } = renderWithRouter(<App />);
    const imagePokemon = getByRole('img');

    expect(imagePokemon).toHaveAttribute('src', image);
    expect(imagePokemon).toHaveAttribute('alt', `${name} sprite`);
  });

  const moreDetails = 'More details';
  test('Testa se possui a URL que contem link de detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(moreDetails);
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('Testa se ocorre redirecionamento ao clicar no link', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(moreDetails);

    userEvent.click(moreDetailsLink);

    expect(getByText(name)).toBeInTheDocument();
  });

  test('Testa se a URL troca para id do Pokemon encontrado', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(moreDetails);

    userEvent.click(moreDetailsLink);

    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se existe um icone de favoritos no Pokemon', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(moreDetails);
    userEvent.click(moreDetailsLink);
    const favPokemon = getByText('Pokémon favoritado?');
    userEvent.click(favPokemon);

    const imgStar = getAllByRole('img');
    expect(imgStar[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStar[1]).toBeInTheDocument();
  });

  test('Testa se icone favorito tem alt correto', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(moreDetails);
    userEvent.click(moreDetailsLink);

    const imgStar = getAllByRole('img');
    expect(imgStar[1]).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
