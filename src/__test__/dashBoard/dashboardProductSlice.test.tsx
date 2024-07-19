import { describe, it, expect } from 'vitest';
import DeshboardProductsSlice, {
  initialState,
  fetchDashboardProduct,
} from '@/features/Dashboard/dashboardProductsSlice';

describe('DeshboardProductsSlice reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'unknown/action' };
    expect(DeshboardProductsSlice(undefined, action)).toEqual(initialState);
  });

  it('should handle fetchDashboardProduct.pending', () => {
    expect(
      DeshboardProductsSlice(initialState, {
        type: fetchDashboardProduct.pending.type,
      })
    ).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle fetchDashboardProduct.fulfilled', () => {
    const mockProducts = [
      { id: 1, title: 'Product A' },
      { id: 2, title: 'Product B' },
    ];
    expect(
      DeshboardProductsSlice(initialState, {
        type: fetchDashboardProduct.fulfilled.type,
        payload: mockProducts,
      })
    ).toEqual({
      ...initialState,
      status: 'succeeded',
      DashboardProduct: mockProducts,
    });
  });

  it('should handle fetchDashboardProduct.rejected', () => {
    expect(
      DeshboardProductsSlice(initialState, {
        type: fetchDashboardProduct.rejected.type,
      })
    ).toEqual({
      ...initialState,
      status: 'failed',
    });
  });
});
