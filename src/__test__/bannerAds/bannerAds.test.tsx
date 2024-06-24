import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BannerAd from '@/components/bannerAds/bannerAds';
import egg from '@/assets/egg.png';

describe('banner Component', () => {
  it('renders BannerAd component with given props', () => {
    render(
      <MemoryRouter>
        <BannerAd
          key={1}
          s_title="this week"
          title="eggs"
          description="snacks"
          image={egg}
        />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('paragraph')[0]).toHaveTextContent('this week');

    expect(screen.getByText('eggs')).toBeInTheDocument();

    expect(screen.getAllByRole('paragraph')[1]).toHaveTextContent('snacks');

    const button = screen.getByRole('button', { name: /shop now/i });
    expect(button).toBeInTheDocument();

    const icon = screen.getByTitle('icon');
    expect(icon).toBeInTheDocument();
    expect(button).toContainElement(icon);

    const image = screen.getByAltText(/eggs/i);
    expect(image).toBeInTheDocument();
  });
});
