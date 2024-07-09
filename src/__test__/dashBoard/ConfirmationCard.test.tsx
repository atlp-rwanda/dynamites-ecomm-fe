import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Assuming 'vitest' is used for assertions
import ConfirmationCard from '@/components/dashBoard/ConfirmationCard'; // Adjust path as needed

describe('ConfirmationCard Component', () => {
  it('does not render when isVisible is false', () => {
    render(
      <ConfirmationCard
        isVisible={false}
        onClose={() => {}}
        onConfirm={() => {}}
        message="Are you sure?"
      />
    );

    const modal = screen.queryByText('Are you sure?');
    expect(modal).not.toBeInTheDocument();
  });

  it('renders correctly when isVisible is true', () => {
    render(
      <ConfirmationCard
        isVisible
        onClose={() => {}}
        onConfirm={() => {}}
        message="Are you sure?"
      />
    );

    const modal = screen.getByText('Are you sure?');
    expect(modal).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <ConfirmationCard
        isVisible
        onClose={onClose}
        onConfirm={() => {}}
        message="Are you sure?"
      />
    );

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the "No, cancel" button is clicked', () => {
    const onClose = vi.fn();
    render(
      <ConfirmationCard
        isVisible
        onClose={onClose}
        onConfirm={() => {}}
        message="Are you sure?"
      />
    );

    const cancelButton = screen.getByRole('button', { name: /no, cancel/i });
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when the "Yes, I\'m sure" button is clicked', () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmationCard
        isVisible
        onClose={() => {}}
        onConfirm={onConfirm}
        message="Are you sure?"
      />
    );

    const confirmButton = screen.getByRole('button', {
      name: /yes, i'm sure/i,
    });
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('displays the correct message', () => {
    const message = 'Are you absolutely sure?';
    render(
      <ConfirmationCard
        isVisible
        onClose={() => {}}
        onConfirm={() => {}}
        message={message}
      />
    );

    const modalMessage = screen.getByText(message);
    expect(modalMessage).toBeInTheDocument();
  });
});
