import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { describe, it, expect } from 'vitest'; // Assuming vitest is similar to Jest or Mocha
import { MemoryRouter } from 'react-router-dom';
import HelloSection from '@/components/HelloSection/HelloSection';

describe('HelloSection Component', () => {
  it('renders the first slide initially', async () => {
    render(
      <MemoryRouter>
        <HelloSection />
      </MemoryRouter>
    );

    await waitFor(() => {
      const images = screen.getAllByAltText((content, element) => {
        return (
          element !== null &&
          element.tagName.toLowerCase() === 'img' &&
          content.includes('Slide Images -')
        );
      });
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

  it('updates the active slide indicator on dot click', async () => {
    render(
      <MemoryRouter>
        <HelloSection />
      </MemoryRouter>
    );

    await waitFor(async () => {
      expect(screen.getByTestId('active-indicator-0')).toHaveClass(
        'bg-[#6D31ED]'
      );

      const thirdDot = screen.getByTestId('active-indicator-2');
      fireEvent.click(thirdDot);

      await waitFor(() => {
        expect(screen.getByTestId('active-indicator-2')).toHaveClass(
          'bg-[#6D31ED]'
        );
      });
    });
  });

  it('automatically changes slides after interval', async () => {
    render(
      <MemoryRouter>
        <HelloSection />
      </MemoryRouter>
    );

    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 6000));
    });

    await waitFor(() => {
      expect(screen.getByText('Exclusive Summer Sale☀️')).toBeInTheDocument();
    });
  }, 10000);
});
