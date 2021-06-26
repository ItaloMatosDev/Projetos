import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound', () => {
  test('Testa se contem um header com Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFoundPage = getByText('Page requested not found');

    expect(notFoundPage).toBeInTheDocument();
  });

  test('Testa se possui a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const image = getAllByRole('img');
    const pathImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image[1]).toHaveAttribute('src', pathImg);
  });
});
