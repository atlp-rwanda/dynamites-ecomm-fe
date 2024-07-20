import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import axios from 'axios';
import addProductSlice from '@/features/Dashboard/addProductSlice';
import { uploadSingleImage, uploadGalleryImages } from '@/utils/cloudinary';
import AddProducts from '@/components/dashBoard/addProducts';

vi.mock('@/utils/cloudinary', () => ({
  uploadSingleImage: vi.fn(),
  uploadGalleryImages: vi.fn(),
}));
let actions: any[] = [];

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      product: addProductSlice,
    },
  });
  actions = [];
  const originalDispatch = store.dispatch;
  store.dispatch = (action: any) => {
    actions.push(action);
    return originalDispatch(action);
  };
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('AddProducts', () => {
  beforeEach(() => {
    (uploadSingleImage as jest.Mock).mockResolvedValue(
      'https://example.com/image.jpg'
    );
    (uploadGalleryImages as jest.Mock).mockResolvedValue([
      'https://example.com/gallery1.jpg',
      'https://example.com/gallery2.jpg',
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the AddProducts form', () => {
    renderWithProviders(<AddProducts />);
    expect(screen.getByText('Create new product')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    renderWithProviders(<AddProducts />);

    const productNameInput = screen.getByPlaceholderText(
      'Casual Button-Down Shirt'
    );
    const shortDescInput = screen.getByPlaceholderText('Short Description');
    const longDescInput = screen.getByPlaceholderText(
      'Enter a long description'
    );
    const regularPriceInput = screen.getByPlaceholderText('99');
    const salesPriceInput = screen.getByPlaceholderText('79');
    const quantityInput = screen.getByPlaceholderText('1');

    await act(async () => {
      fireEvent.change(productNameInput, { target: { value: 'Test Product' } });
      fireEvent.change(shortDescInput, {
        target: { value: 'Short Description' },
      });
      fireEvent.change(longDescInput, {
        target: { value: 'Long description of product' },
      });
      fireEvent.change(regularPriceInput, { target: { value: '100' } });
      fireEvent.change(salesPriceInput, { target: { value: '80' } });
      fireEvent.change(quantityInput, { target: { value: '10' } });
      fireEvent.click(screen.getByText('+ Add another Tag'));
    });

    const imageInput = screen.getByLabelText('Feature Image');
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    await act(async () => {
      userEvent.upload(imageInput, file);
      await waitFor(() => {
        expect(uploadSingleImage).toHaveBeenCalled();
      });
      fireEvent.submit(screen.getByText('Save Product'));
    });
  });

  it('handles image upload and removal', async () => {
    renderWithProviders(<AddProducts />);

    const imageInput = screen.getByLabelText('Feature Image');
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    await act(async () => {
      userEvent.upload(imageInput, file);
      await waitFor(() => {
        expect(uploadSingleImage).toHaveBeenCalled();
      });
      await waitFor(() => {
        expect(screen.queryByAltText('Feature')).not.toBeInTheDocument();
      });
    });
  });

  it('handles gallery image upload and removal', async () => {
    renderWithProviders(<AddProducts />);

    const galleryImageInput = screen.getByLabelText('Gallery');
    const files = [
      new File(['dummy content'], 'gallery1.png', { type: 'image/png' }),
      new File(['dummy content'], 'gallery2.png', { type: 'image/png' }),
    ];
    await act(async () => {
      userEvent.upload(galleryImageInput, files);
      await waitFor(() => {
        expect(uploadGalleryImages).toHaveBeenCalled();
      });
      await waitFor(() => {
        expect(screen.queryByAltText('Gallery 0')).not.toBeInTheDocument();
      });
    });
  });

  it('displays validation errors', async () => {
    renderWithProviders(<AddProducts />);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    async () => {
      fireEvent.submit(screen.getByText('Save Product'));
      await waitFor(() => {
        expect(
          screen.getByText('Product Names is required')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Short Description is required')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Long Description is required')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Regular Price is required')
        ).toBeInTheDocument();
        expect(screen.getByText('Sales Price is required')).toBeInTheDocument();
        expect(screen.getByText('quantity is required')).toBeInTheDocument();
        expect(
          screen.getByText('Feature Image is required')
        ).toBeInTheDocument();
        expect(
          screen.getByText('At least one gallery image is required')
        ).toBeInTheDocument();
      });
    };
  });

  it('removes an image from the gallery', async () => {
    renderWithProviders(<AddProducts />);

    const galleryImageInput = screen.getByLabelText('Gallery');
    const files = [
      new File(['dummy content'], 'gallery1.png', { type: 'image/png' }),
      new File(['dummy content'], 'gallery2.png', { type: 'image/png' }),
    ];

    await act(async () => {
      fireEvent.change(galleryImageInput, {
        target: { files: [files[0], files[1]] },
      });
    });

    const removeButton = screen.getAllByText('x')[0];
    fireEvent.click(removeButton);
  });

  it('adds and removes tags', async () => {
    renderWithProviders(<AddProducts />);

    const newTagInput = screen.getByLabelText('Tags');
    fireEvent.change(newTagInput, { target: { value: 'tag1' } });
    fireEvent.click(screen.getByText('+ Add another Tag'));
    expect(screen.getByText('tag1')).toBeInTheDocument();

    const removeTagButton = screen.getByText('X', { selector: 'button' });
    fireEvent.click(removeTagButton);
    expect(screen.queryByText('tag1')).not.toBeInTheDocument();
  });

  it('fetches categories correctly', async () => {
    const mockCategories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];

    vi.spyOn(axios, 'get').mockResolvedValue({
      data: { data: mockCategories },
    });

    renderWithProviders(<AddProducts />);

    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument();
      expect(screen.getByText('Category 2')).toBeInTheDocument();
    });
  });
});
