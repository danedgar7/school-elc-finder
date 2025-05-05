import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AssessmentCriteria } from './AssessmentCriteria'; // Adjust path if necessary

// Mock data similar to what the component expects
const mockCriteria = [
  { key: 'academic', label: 'Academics' },
  { key: 'wellbeing', label: 'Wellbeing' },
  { key: 'facilities', label: 'Facilities' },
];

const mockWeights = {
  academic: 5,
  wellbeing: 7,
  facilities: 3,
};

// Mock onChange function
const mockOnChange = jest.fn();

describe('AssessmentCriteria Component', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockOnChange.mockClear();
  });

  it('should render a slider for each criterion', () => {
    render(
      <AssessmentCriteria
        criteria={mockCriteria}
        weights={mockWeights}
        onChange={mockOnChange}
      />
    );

    // Find all elements with the 'slider' role
    const sliders = screen.getAllByRole('slider');

    // Expect the number of sliders to match the number of criteria
    expect(sliders).toHaveLength(mockCriteria.length);

    // Optional: Check aria-labels for more specific targeting
    mockCriteria.forEach(criterion => {
      expect(screen.getByLabelText(`${criterion.label} weight`)).toBeInTheDocument();
    });
  });

  it('should call onChange when a slider value changes', () => {
    // Use render initially, capture rerender function
    const { rerender } = render(
      <AssessmentCriteria
        criteria={mockCriteria}
        weights={mockWeights}
        onChange={mockOnChange}
      />
    );

    // Find the slider associated with 'Academics' by its aria-label
    const academicsSlider = screen.getByLabelText('Academics weight');

    // Simulate pressing the right arrow key to increase the value
    // Note: We target the element with role='slider' which is the thumb
    fireEvent.keyDown(academicsSlider, { key: 'ArrowRight', code: 'ArrowRight' });

    // Expect onChange to have been called once
    expect(mockOnChange).toHaveBeenCalledTimes(1);

    // Expect onChange to have been called with the correct criterion key ('academic')
    // and the new value (initial value 5 + step 1 = 6)
    expect(mockOnChange).toHaveBeenCalledWith('academic', 6);

    // --- Simulate Parent Updating Props ---
    // Create a *new* weights object reflecting the change
    const updatedWeights = { ...mockWeights, academic: 6 };

    // Rerender the component with the updated weights
    rerender(
      <AssessmentCriteria
        criteria={mockCriteria}
        weights={updatedWeights}
        onChange={mockOnChange}
      />
    );
    // -------------------------------------

    // Simulate pressing the left arrow key to decrease the value
    fireEvent.keyDown(academicsSlider, { key: 'ArrowLeft', code: 'ArrowLeft' });

    // Expect onChange to have been called twice now
    expect(mockOnChange).toHaveBeenCalledTimes(2);

    // Expect the second call to be with the value after update (6 - step 1 = 5)
    expect(mockOnChange).toHaveBeenCalledWith('academic', 5);
  });
});
