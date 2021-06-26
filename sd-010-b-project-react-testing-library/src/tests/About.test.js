import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';
//

describe('Testa o componente About', () => {
  test('Testa se a pagina contem as informaçoes sobre a Pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const informations = getByText(/About Pokédex/i);

    expect(informations).toBeInTheDocument();
  });

  test('Testa se a página contem um heading com texto About Pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const headingText = getByRole('heading', { name: /about Pokédex/i });

    expect(headingText).toBeInTheDocument();
  });

  test('Testa se a pagina contem dois paragrafos sobre Pokedex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const textPokedex = getAllByText(/Pokémons/);

    expect(textPokedex.length).toBe(2);
  });

  test('Testa se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const pathImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toHaveAttribute('src', pathImg);
  });

  // test('')
});
