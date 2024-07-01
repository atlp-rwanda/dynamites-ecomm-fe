import productsReducer, {
  initialState,
} from '@/features/availableProductSlice';
import { fetchProducts } from '@/features/availableProductSlice';
import { describe, it, expect } from 'vitest';

describe('products reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'unknown/action' };

    expect(productsReducer(undefined, action)).toEqual(initialState);
  });

  it('should handle fetchProducts.pending', () => {
    expect(
      productsReducer(initialState, {
        type: fetchProducts.pending.type,
      })
    ).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle fetchProducts.fulfilled', () => {
    const mockProducts = [
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' },
    ];

    expect(
      productsReducer(initialState, {
        type: fetchProducts.fulfilled.type,
        payload: mockProducts,
      })
    ).toEqual({
      ...initialState,
      status: 'succeeded',
      items: mockProducts,
    });
  });

  it('should handle fetchProducts.rejected', () => {
    expect(
      productsReducer(initialState, {
        type: fetchProducts.rejected.type,
      })
    ).toEqual({
      ...initialState,
      status: 'failed',
    });
  });
});
