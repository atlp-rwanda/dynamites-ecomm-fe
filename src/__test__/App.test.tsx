import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/pages/Home';
import ErrorPage from '@/pages/ErrorPage';

describe('App', () => {
  it('Renders Welcome to Dynamites E-commerce', () => {
    render(<Home />);
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'Welcome to Dynamites E-commerce'
    );
  });

  it('it renders Not Found Page', () => {
    render(<ErrorPage />);
    expect(screen.getByRole('paragraph')).toHaveTextContent('Not Found Page');
  });
});
