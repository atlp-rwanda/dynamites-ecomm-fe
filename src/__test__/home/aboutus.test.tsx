import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Aboutus from '@/components/home/Aboutus';

const renderWithProviders = (
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {},
    }),
  } = {}
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('Aboutus Component', () => {
  test('renders Aboutus component', () => {
    renderWithProviders(<Aboutus />);

    expect(screen.getByText('Dynamite E-commerce')).toBeInTheDocument();

    expect(screen.getAllByRole('img')).toHaveLength(4);

    expect(screen.getByText('Mission')).toBeInTheDocument();
    expect(
      screen.getByText(
        'We prosper our customers to give them valuable product at affordable price in fast process.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(
      screen.getByText(
        'E-commerce is your go-to platform designed for security reasons. Data privacy is our endless goal for potential customers to feel at ease.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('why choose us')).toBeInTheDocument();
  });
});
