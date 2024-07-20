import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FAQItem from '@/components/Contact/FaqItem';
import FAQList from '@/components/Contact/FaqList';
import Faqs from '@/components/Contact/FaqComponent';

// Mock data for testing
const faqData = [
  {
    question: 'How do I pay using MTN Mobile Money?',
    answer:
      "To designate your donation to a specific area or project, send us a note with your donation by mail. We'll allocate it accordingly and send you an acknowledgment. If donating by phone, inform the representative about your preference. Online donations do not renew memberships and can only be allocated to states or countries, not individual projects.",
  },
  {
    question: 'How can I track my order?',
    answer:
      'You can track your order using the tracking number provided in your order confirmation email. Visit our order tracking page and enter the tracking number to see the status of your shipment.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'Our return policy allows you to return items within 30 days of purchase. Items must be in their original condition and packaging. Please visit our returns page for more details and to initiate a return.',
  },
];

describe('FAQ Components', () => {
  // Test FAQItem component
  describe('FAQItem', () => {
    const mockProps = {
      question: 'Test Question?',
      answer: 'Test Answer.',
      isOpen: false,
      onClick: vi.fn(),
    };

    it('should render the question', () => {
      render(<FAQItem {...mockProps} />);
      expect(screen.getByText('Test Question?')).toBeInTheDocument();
    });

    it('should not render the answer when isOpen is false', () => {
      render(<FAQItem {...mockProps} />);
      expect(screen.queryByText('Test Answer.')).not.toBeInTheDocument();
    });

    it('should render the answer when isOpen is true', () => {
      render(<FAQItem {...mockProps} isOpen />);
      expect(screen.getByText('Test Answer.')).toBeInTheDocument();
    });

    it('should call onClick when the button is clicked', () => {
      render(<FAQItem {...mockProps} />);
      fireEvent.click(screen.getByRole('button'));
      expect(mockProps.onClick).toHaveBeenCalled();
    });
  });

  // Test FAQList component
  describe('FAQList', () => {
    it('should render all FAQ items', () => {
      render(<FAQList faqs={faqData} />);
      faqData.forEach((faq) => {
        expect(screen.getByText(faq.question)).toBeInTheDocument();
      });
    });

    it('should open the first FAQ item by default', () => {
      render(<FAQList faqs={faqData} />);
      expect(screen.getByText(faqData[0].answer)).toBeInTheDocument();
    });

    it('should close the first FAQ item and open the second when the second item is clicked', () => {
      render(<FAQList faqs={faqData} />);
      const secondItemButton = screen.getAllByRole('button')[1];
      fireEvent.click(secondItemButton);
      expect(screen.queryByText(faqData[0].answer)).not.toBeInTheDocument();
      expect(screen.getByText(faqData[1].answer)).toBeInTheDocument();
    });
  });

  // Test Faqs component
  describe('Faqs', () => {
    it('should render the FAQList component with correct data', () => {
      render(<Faqs />);
      faqData.forEach((faq) => {
        expect(screen.getByText(faq.question)).toBeInTheDocument();
      });
    });

    it('should display the title and description', () => {
      render(<Faqs />);
      expect(
        screen.getByText('Frequently Asked questions')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Exercitation dolore reprehenderit fug')
      ).toBeInTheDocument();
    });
  });
});
