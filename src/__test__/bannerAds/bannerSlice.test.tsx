import { describe, it, expect } from 'vitest';
import productsReducer, {
  initialState,
  fetchBannerProducts,
} from '@/app/bannerAds/BannerSlice';

describe('products reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'unknown/action' };
    expect(productsReducer(undefined, action)).toEqual(initialState);
  });

  it('should handle fetchProducts.pending', () => {
    expect(
      productsReducer(initialState, {
        type: fetchBannerProducts.pending.type,
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
        type: fetchBannerProducts.fulfilled.type,
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
        type: fetchBannerProducts.rejected.type,
      })
    ).toEqual({
      ...initialState,
      status: 'failed',
    });
  });
});
