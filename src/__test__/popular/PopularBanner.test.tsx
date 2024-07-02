import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; // Assuming 'vitest' is used for assertions
import BannerAD from '@/components/Popular/BannerAD'; // Adjust path as needed
import ADImage from '@/assets/Image/Rectangle 901.svg'; // Adjust path as needed

describe('BannerAD Component', () => {
  it('renders BannerAD component correctly', () => {
    render(<BannerAD />);

    const headline = screen.getByText(
      'In store or online your health & safety is our priority'
    );
    expect(headline).toBeInTheDocument();

    const description = screen.getByText(
      'The only E-commerce that makes your life easier, makes you enjoy life and makes it bette'
    );
    expect(description).toBeInTheDocument();

    const adImage = screen.getByAltText('AD');
    expect(adImage).toBeInTheDocument();
    expect(adImage.getAttribute('src')).toBe(ADImage); // Ensure correct image source
  });
});
