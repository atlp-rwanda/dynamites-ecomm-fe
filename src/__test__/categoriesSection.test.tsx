import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import CategoriesHome from '@/components/home/CategoriesHome';
import { store } from '@/app/store';

describe('App', () => {
  it('Renders Home Categories Section', () => {
    render(
      <Provider store={store}>
        <CategoriesHome />
      </Provider>
    );
    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
  });
});
