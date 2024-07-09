import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CircularPagination from '@/components/dashBoard/NavigateonPage';

describe('CircularPagination Component', () => {
  const onPageChange = vi.fn();

  it('renders the correct number of pages when totalPages <= 5', () => {
    render(
      <CircularPagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(7);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders correctly when currentPage is at the beginning', () => {
    render(
      <CircularPagination
        totalPages={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(9);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders correctly when currentPage is at the end', () => {
    render(
      <CircularPagination
        totalPages={10}
        currentPage={10}
        onPageChange={onPageChange}
      />
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(9);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders correctly when currentPage is in the middle', () => {
    render(
      <CircularPagination
        totalPages={10}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(10);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls onPageChange with the correct page number when a page button is clicked', () => {
    render(
      <CircularPagination
        totalPages={10}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText('6'));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it('calls onPageChange with the correct page number when the next button is clicked', () => {
    render(
      <CircularPagination
        totalPages={10}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('next page'));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it('calls onPageChange with the correct page number when the previous button is clicked', () => {
    render(
      <CircularPagination
        totalPages={10}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('disables the previous button when on the first page', () => {
    render(
      <CircularPagination
        totalPages={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables the next button when on the last page', () => {
    render(
      <CircularPagination
        totalPages={10}
        currentPage={10}
        onPageChange={onPageChange}
      />
    );

    const nextButton = screen.getByLabelText('next page');
    expect(nextButton).toBeDisabled();
  });
});
