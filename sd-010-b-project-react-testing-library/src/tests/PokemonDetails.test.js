import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import Pokedex from '../components/Pokedex';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const mockedPokemon = pokemons[0];
const { id, name, summary, foundAt } = mockedPokemon;
// const { measurementUnit, value } = averageWeight;

describe('Testa o componente Pokemon Details', () => {
  test('Testa se tem o Nome do Pokemon seguido de Details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);
    const namePokemon = getByText(`${name} Details`);
    expect(namePokemon).toBeInTheDocument();
  });

  const moreDetails = 'More details';

  test('Testa se nao existe link de navegação', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: moreDetails });
    const route = `/pokemons/${id}`;
    history.push(route);
    expect(moreDetailsLink).not.toBeInTheDocument();
  });

  test('Testa se possui heading h2 Summary', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);

    const headingSummary = getByRole('heading', { name: 'Summary', level: 2 });
    expect(headingSummary).toBeInTheDocument();
  });

  test('Testa se contem paragrafo de resumo', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);
    const textSummary = getByText(summary);

    expect(textSummary).toBeInTheDocument();
  });

  test('Testa se existe heading h2 com Game Location Pokemon', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);

    const location = getByRole('heading', { name: `Game Locations of ${name}` });
    expect(location).toBeInTheDocument();
  });

  test('Testa se todas as localizacoes sao mostradas na pagina de detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);

    const textLocation = foundAt.map(({ location }) => getByText(location));

    textLocation.forEach((location) => expect(location).toBeInTheDocument());
  });

  test('Testa se sao exibidos nome da localizaçao e imagem', () => {
    const { getByText, getAllByAltText, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);

    const textLocation = foundAt.map(({ location }) => getByText(location));

    textLocation.forEach((location) => expect(location).toBeInTheDocument());

    const mapLocation = getAllByAltText(`${name} location`);

    mapLocation.forEach((locationMap) => expect(locationMap).toBeInTheDocument());
  });

  test('Testa se a imagem tem atributo src com URL da localizaçao', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);
    const images = getAllByRole('img');
    const srcImg = images.map((elemento) => elemento.src);

    foundAt.forEach(({ map }) => { expect(srcImg).toContain(map); });
  });

  test('Testa se a imagem tem atributo alt adequado', () => {
    const { getAllByAltText, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);

    const locationAltMap = getAllByAltText(`${name} location`);
    locationAltMap.forEach((location) => expect(location).toBeInTheDocument());
  });

  const favPokemon = 'Pokémon favoritado?';
  test('Testa se existe um checkbox para favoritar Pokemon', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);

    const fav = getByRole('checkbox', { name: favPokemon });
    expect(fav).toBeInTheDocument();
  });

  test('Testa se remove checkbox do favoritar Pokemon', () => {
    const { getByRole, getAllByRole, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);
    const fav = getByRole('checkbox', { name: favPokemon });
    userEvent.click(fav);

    const imgStar = getAllByRole('img');
    expect(imgStar[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStar[1]).toBeInTheDocument();
    userEvent.click(fav);
    expect(imgStar[1]).not.toBeInTheDocument();
  });

  test('Testa se o label contem o texto Pokemon Favoritado', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = `/pokemons/${id}`;
    history.push(route);
    const fav = getByText(favPokemon);
    expect(fav).toBeInTheDocument();
  });
});
