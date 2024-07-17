// SectionHeader.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SectionHeader from '@/components/home/SectionHeaderCta';

describe('SectionHeader Component', () => {
  // Helper to wrap the component with Router for Link to work
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<Router>{ui}</Router>);
  };

  test('renders SectionHeader with title and description', () => {
    renderWithRouter(
      <SectionHeader
        title="Featured Products"
        description="Don't miss this opportunity at a special discount just for this week."
      />
    );

    // Check that title and description are displayed
    expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Don't miss this opportunity/i)
    ).toBeInTheDocument();
  });

  test('renders SectionHeader with a link', () => {
    renderWithRouter(
      <SectionHeader
        title="Featured Products"
        description="Don't miss this opportunity at a special discount just for this week."
        link={{ url: '/shop', text: 'View All' }}
      />
    );

    // Check that the link is displayed
    expect(screen.getByRole('link', { name: /View All/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View All/i })).toHaveAttribute(
      'href',
      '/shop'
    );
  });

  test('does not render link if link prop is not provided', () => {
    renderWithRouter(
      <SectionHeader
        title="Featured Products"
        description="Don't miss this opportunity at a special discount just for this week."
      />
    );

    // Check that the link is not displayed
    expect(screen.queryByRole('link')).toBeNull();
  });

  test('renders SectionHeader with correct styling', () => {
    renderWithRouter(
      <SectionHeader
        title="Featured Products"
        description="Don't miss this opportunity at a special discount just for this week."
        link={{ url: '/shop', text: 'View All' }}
      />
    );

    // Check that the correct styles are applied
    expect(screen.getByText(/Featured Products/i)).toHaveClass(
      'text-3xl font-semibold text-black'
    );
    expect(screen.getByText(/Don't miss this opportunity/i)).toHaveClass(
      'text-sm font-light text-black'
    );
  });

  test('renders icon in the link', () => {
    renderWithRouter(
      <SectionHeader
        title="Featured Products"
        description="Don't miss this opportunity at a special discount just for this week."
        link={{ url: '/shop', text: 'View All' }}
      />
    );

    // Check that the icon is present in the link
    expect(screen.getByRole('link', { name: /View All/i })).toContainElement(
      screen.getByTestId('icon')
    );
  });
});
