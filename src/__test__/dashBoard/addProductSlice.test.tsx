import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import addProductSlice, {
  createProduct,
  setName,
  setImage,
  setGallery,
  setShortDesc,
  setLongDesc,
  setQuantity,
  setRegularPrice,
  setSalesPrice,
  setTags,
  setType,
  setAvailability,
} from '@/features/Dashboard/addProductSlice';
import { showSuccessToast, showErrorToast } from '@/utils/ToastConfig';

vi.mock('axios');
vi.mock('@/utils/ToastConfig', () => ({
  showSuccessToast: vi.fn(),
  showErrorToast: vi.fn(),
}));

interface ProductState {
  name: string;
  image: string | null;
  gallery: string[];
  shortDesc: string;
  longDesc: string;
  quantity: number;
  regularPrice: number;
  salesPrice: number;
  tags: string[];
  type: '';
  isAvailable: boolean;
  loading: boolean;
  error: string | null;
}

describe('adPRoductSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        product: addProductSlice,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should have the correct initial state', () => {
    const state = store.getState().product;
    expect(state).toEqual({
      name: '',
      image: null,
      gallery: [],
      shortDesc: '',
      longDesc: '',
      quantity: 0,
      regularPrice: 0,
      salesPrice: 0,
      tags: [],
      type: '',
      isAvailable: true,
      loading: false,
      error: null,
    });
  });

  it('should handle setName action', () => {
    store.dispatch(setName('Test Product'));
    expect(store.getState().product.name).toBe('Test Product');
  });

  it('should handle setImage action', () => {
    store.dispatch(setImage('https://example.com/image.jpg'));
    expect(store.getState().product.image).toBe(
      'https://example.com/image.jpg'
    );
  });

  it('should handle setGallery action', () => {
    store.dispatch(
      setGallery([
        'https://example.com/gallery1.jpg',
        'https://example.com/gallery2.jpg',
      ])
    );
    expect(store.getState().product.gallery).toEqual([
      'https://example.com/gallery1.jpg',
      'https://example.com/gallery2.jpg',
    ]);
  });

  it('should handle setShortDesc action', () => {
    store.dispatch(setShortDesc('Short Description'));
    expect(store.getState().product.shortDesc).toBe('Short Description');
  });

  it('should handle setLongDesc action', () => {
    store.dispatch(setLongDesc('Long Description'));
    expect(store.getState().product.longDesc).toBe('Long Description');
  });

  it('should handle setQuantity action', () => {
    store.dispatch(setQuantity(10));
    expect(store.getState().product.quantity).toBe(10);
  });

  it('should handle setRegularPrice action', () => {
    store.dispatch(setRegularPrice(100));
    expect(store.getState().product.regularPrice).toBe(100);
  });

  it('should handle setSalesPrice action', () => {
    store.dispatch(setSalesPrice(80));
    expect(store.getState().product.salesPrice).toBe(80);
  });

  it('should handle setTags action', () => {
    store.dispatch(setTags(['tag1', 'tag2']));
    expect(store.getState().product.tags).toEqual(['tag1', 'tag2']);
  });

  it('should handle setType action', () => {
    store.dispatch(setType('Grouped'));
    expect(store.getState().product.type).toBe('Grouped');
  });

  it('should handle setAvailability action', () => {
    store.dispatch(setAvailability(false));
    expect(store.getState().product.isAvailable).toBe(false);
  });

  it('should handle createProduct.pending', () => {
    const action = { type: createProduct.pending.type };
    const state = addProductSlice(undefined, action);
    expect(state).toEqual({
      name: '',
      image: null,
      gallery: [],
      shortDesc: '',
      longDesc: '',
      quantity: 0,
      regularPrice: 0,
      salesPrice: 0,
      tags: [],
      type: '',
      isAvailable: true,
      loading: true,
      error: null,
    });
  });

  it('should handle createProduct.fulfilled', async () => {
    (axios.post as any).mockResolvedValue({
      data: { message: 'Product created successfully' },
    });
    const action = { type: createProduct.fulfilled.type };
    const state = await addProductSlice(undefined, action);
    expect(state).toEqual({
      name: '',
      image: null,
      gallery: [],
      shortDesc: '',
      longDesc: '',
      quantity: 0,
      regularPrice: 0,
      salesPrice: 0,
      tags: [],
      type: '',
      isAvailable: true,
      loading: false,
      error: null,
    });
    expect(showSuccessToast).toHaveBeenCalledWith(
      'Product created successfully'
    );
  });

  it('should handle createProduct.rejected', async () => {
    (axios.post as any).mockRejectedValue({
      response: { data: { message: 'Failed to create product' } },
    });
    const action = {
      type: createProduct.rejected.type,
      payload: 'Failed to create product',
    };
    const state = await addProductSlice(undefined, action);
    expect(state).toEqual({
      name: '',
      image: null,
      gallery: [],
      shortDesc: '',
      longDesc: '',
      quantity: 0,
      regularPrice: 0,
      salesPrice: 0,
      tags: [],
      type: '',
      isAvailable: true,
      loading: false,
      error: 'Failed to create product',
    });
    expect(showErrorToast).toHaveBeenCalledWith('Failed to create product');
  });

  it('should create a product successfully', async () => {
    const productData: Omit<ProductState, 'loading' | 'error'> = {
      name: 'Test Product',
      shortDesc: 'Short Description',
      longDesc: 'Long Description',
      regularPrice: 100,
      salesPrice: 80,
      quantity: 10,
      type: '',
      isAvailable: true,
      image: 'https://example.com/image.jpg',
      gallery: [
        'https://example.com/gallery1.jpg',
        'https://example.com/gallery2.jpg',
      ],
      tags: ['tag1', 'tag2'],
    };

    (axios.post as any).mockResolvedValue({
      data: { message: 'Product created successfully' },
    });
    localStorage.setItem('token', 'testToken');

    await store.dispatch(createProduct(productData));

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/product`,
      productData,
      {
        headers: {
          Authorization: 'Bearer testToken',
        },
      }
    );

    const state = store.getState().product;
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(showSuccessToast).toHaveBeenCalledWith(
      'Product created successfully'
    );
  });

  it('should handle error when creating a product', async () => {
    const productData: Omit<ProductState, 'loading' | 'error'> = {
      name: 'Test Product',
      shortDesc: 'Short Description',
      longDesc: 'Long Description',
      regularPrice: 100,
      salesPrice: 80,
      quantity: 10,
      type: '',
      isAvailable: true,
      image: 'https://example.com/image.jpg',
      gallery: [
        'https://example.com/gallery1.jpg',
        'https://example.com/gallery2.jpg',
      ],
      tags: ['tag1', 'tag2'],
    };

    (axios.post as any).mockRejectedValue({
      response: { data: { message: 'Failed to create product' } },
    });
    localStorage.setItem('token', 'testToken');

    await store.dispatch(createProduct(productData));

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/product`,
      productData,
      {
        headers: {
          Authorization: 'Bearer testToken',
        },
      }
    );

    const state = store.getState().product;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to create product');
    expect(showErrorToast).toHaveBeenCalledWith('Failed to create product');
  });

  it('should handle error when no token is found', async () => {
    const productData: Omit<ProductState, 'loading' | 'error'> = {
      name: 'Test Product',
      shortDesc: 'Short Description',
      longDesc: 'Long Description',
      regularPrice: 100,
      salesPrice: 80,
      quantity: 10,
      type: '',
      isAvailable: true,
      image: 'https://example.com/image.jpg',
      gallery: [
        'https://example.com/gallery1.jpg',
        'https://example.com/gallery2.jpg',
      ],
      tags: ['tag1', 'tag2'],
    };

    localStorage.removeItem('token');

    await store.dispatch(createProduct(productData));

    const state = store.getState().product;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('No token found');
  });
});
