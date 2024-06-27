import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; // Assuming 'vitest' is used for assertions
import PopularTitle from '@/components/Popular-section/PopilarTitle'; // Adjust path as needed
// import leftIcon from '../../assets/icon/Left-Arrow.svg'; // Adjust path as needed
// import rightIcon from '../../assets/icon/Right-Arrow.svg'; // Adjust path as needed

describe('PopularTitle Component', () => {
  it('renders PopularTitle component with given props', () => {
    // Mock functions for left and right arrow clicks
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

    // Simulate click events on arrows (you may need to adjust this part based on your testing environment)
    leftArrow.click();
    rightArrow.click();
  });
});
