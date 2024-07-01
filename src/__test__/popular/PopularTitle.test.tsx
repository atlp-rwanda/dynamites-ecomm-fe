import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PopularTitle from '@/components/Popular/PopilarTitle';

describe('PopularTitle Component', () => {
  it('renders PopularTitle component with given props', () => {
    const mockLeftArrowClick = () => {};
    const mockRightArrowClick = () => {};

    render(
      <PopularTitle
        section="Popular Section"
        onLeftArrowClick={mockLeftArrowClick}
        onRightArrowClick={mockRightArrowClick}
      />
    );

    expect(screen.getByText('Popular Section')).toBeInTheDocument();

    const leftArrow = screen.getByAltText('Left Arrow Icon');
    expect(leftArrow).toBeInTheDocument();

    const rightArrow = screen.getByAltText('Right Arrow Icon');
    expect(rightArrow).toBeInTheDocument();

    leftArrow.click();
    rightArrow.click();
  });
});
