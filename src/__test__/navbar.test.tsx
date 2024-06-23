import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from '@/components/Navbar';

describe('Navbar Component', () => {
  it('renders Navbar component', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();

    const title = screen.getByText(/dynamites/i);
    expect(title).toBeInTheDocument();

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const shopLink = screen.getByText(/Shop/i);
    expect(shopLink).toBeInTheDocument();

    const aboutLink = screen.getByText(/About us/i);
    expect(aboutLink).toBeInTheDocument();

    const contactLink = screen.getAllByText(/Contact/i)[0];
    expect(contactLink).toBeInTheDocument();

    const cartIcon = screen.getByTitle('cart');
    expect(cartIcon).toBeInTheDocument();

    const avatar = screen.getByAltText(/profile/i);
    expect(avatar).toBeInTheDocument();

    const username = screen.getByText(/amanda green/i);
    expect(username).toBeInTheDocument();
  });

  it('highlights the correct navigation link based on the current route', () => {
    render(
      <MemoryRouter initialEntries={['/shop']}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Shop')).toHaveClass(
      'border-b-[2px] border-primary text-primary'
    );
  });

  it('toggles menu on hamburger icon click', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const hamburgerIcon = screen.getByTitle('hamburger');
    fireEvent.click(hamburgerIcon);

    expect(screen.getAllByText(/home/i)[0]).toBeInTheDocument();
  });

  it('renders links with correct paths', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/home/i);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');

    const shopLink = screen.getByText(/shop/i);
    expect(shopLink.closest('a')).toHaveAttribute('href', '/shop');

    const aboutLink = screen.getByText(/about us/i);
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');

    const contactLink = screen.getAllByText(/contact/i)[0];
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  it('displays cart item count', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const cartCount = screen.getByText(/5/i);
    expect(cartCount).toBeInTheDocument();
  });

  it('renders profile options on avatar click', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const profileIcon = screen.getByTitle('toggleProfile');
    fireEvent.click(profileIcon);

    const editProfileOption = screen.getByText(/edit profile/i);
    expect(editProfileOption).toBeInTheDocument();

    const preferencesOption = screen.getByText(/preferences/i);
    expect(preferencesOption).toBeInTheDocument();

    const nightModeOption = screen.getByText(/night mode/i);
    expect(nightModeOption).toBeInTheDocument();

    const helpCenterOption = screen.getByText(/help center/i);
    expect(helpCenterOption).toBeInTheDocument();

    const signOutOption = screen.getByText(/sign out/i);
    expect(signOutOption).toBeInTheDocument();
  });
});
