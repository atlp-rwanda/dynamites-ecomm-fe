import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('Renders Welcome to Dynamites E-commerce', () => {
    render(<App />);
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'Welcome to Dynamites E-commerce'
    );
  });
});
