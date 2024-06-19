import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HelloSection } from '@/components/HelloSection/HelloSection';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('HelloSection Component', () => {
  it('renders the first slide initially', async () => {
    render(
      <MemoryRouter>
        <HelloSection />
      </MemoryRouter>
    );

    await waitFor(() => {
      const images = screen.getAllByAltText('Slide Image');
      expect(images[0]).toBeInTheDocument();
      expect(
        screen.getByText('Absolutely hot collections🔥')
      ).toBeInTheDocument();
    });
  });

  it('navigates to the next slide on button click', async () => {
    render(
      <MemoryRouter>
        <HelloSection />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole('button', { name: /next slide/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Exclusive Summer Sale☀️')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /previous slide/i })
      ).toBeEnabled();
    });
  });

  it('navigates to the previous slide on button click', async () => {
    render(
      <MemoryRouter>
        <HelloSection />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole('button', { name: /next slide/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const prevButton = screen.getByRole('button', { name: /previous slide/i });
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(
        screen.getByText('Absolutely hot collections🔥')
      ).toBeInTheDocument();
    });
  });

  it('updates the active slide indicator', async () => {
    render(
      <MemoryRouter>
        <HelloSection />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('active-indicator-0')).toHaveClass(
        'bg-[#6D31ED]'
      );

      const nextButton = screen.getByRole('button', { name: /next slide/i });
      fireEvent.click(nextButton);

      expect(screen.getByTestId('active-indicator-1')).toHaveClass(
        'bg-[#6D31ED]'
      );
    });
  });
});
