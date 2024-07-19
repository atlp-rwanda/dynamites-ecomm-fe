import { configureStore } from '@reduxjs/toolkit';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import couponsReducer, {
  fetchCoupons,
  fetchMyCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '@/features/Coupons/CouponsFeature';

vi.mock('axios');

const createTestStore = () =>
  configureStore({ reducer: { coupons: couponsReducer } });
let store: any;

describe('couponsSlice', () => {
  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle initial state', () => {
    const { coupons } = store.getState();
    expect(coupons).toEqual({
      coupons: [],
      loading: false,
      error: null,
    });
  });

  describe('fetchCoupons', () => {
    it('should handle fetchCoupons.pending', () => {
      store.dispatch(fetchCoupons.pending('requestId'));
      const { coupons } = store.getState();
      expect(coupons.loading).toBe(true);
    });

    it('should handle fetchCoupons.fulfilled', async () => {
      const mockCoupons = [{ id: 1, code: 'TEST' }];
      (axios.get as any).mockResolvedValueOnce({ data: mockCoupons });

      await store.dispatch(fetchCoupons());
      const { coupons } = store.getState();
      expect(coupons.loading).toBe(false);
      expect(coupons.coupons).toEqual(mockCoupons);
    });

    it('should handle fetchCoupons.rejected', async () => {
      const error = 'Failed to fetch coupons';
      (axios.get as any).mockRejectedValueOnce(new Error(error));

      await store.dispatch(fetchCoupons());
      const { coupons } = store.getState();
      expect(coupons.loading).toBe(false);
      expect(coupons.error).toBe(error);
    });
  });

  describe('fetchMyCoupons', () => {
    it('should handle fetchMyCoupons.pending', () => {
      store.dispatch(fetchMyCoupons.pending('requestId'));
      const { coupons } = store.getState();
      expect(coupons.loading).toBe(true);
    });

    it('should handle fetchMyCoupons.fulfilled', async () => {
      const mockCoupons = [{ id: 1, code: 'MYCOUPON' }];
      (axios.get as any).mockResolvedValueOnce({ data: mockCoupons });

      await store.dispatch(fetchMyCoupons());
      const { coupons } = store.getState();
      expect(coupons.loading).toBe(false);
      expect(coupons.coupons).toEqual(mockCoupons);
    });

    it('should handle fetchMyCoupons.rejected', async () => {
      const error = 'Failed to fetch coupons';
      (axios.get as any).mockRejectedValueOnce(new Error(error));

      await store.dispatch(fetchMyCoupons());
      const { coupons } = store.getState();
      expect(coupons.loading).toBe(false);
      expect(coupons.error).toBe(error);
    });
  });
  describe('createCoupon', () => {
    it('should handle createCoupon.pending', () => {
      const dummyRequestId = 'dummyRequestId';
      const dummyArgs = {
        newCoupon: {
          description: '',
          percentage: 0,
          expirationDate: '',
          applicableProducts: [],
        },
        token: 'dummyToken',
      };

      store.dispatch(createCoupon.pending(dummyRequestId, dummyArgs));
      const { coupons } = store.getState();
      expect(coupons.loading).toBe(true);
    });

    it('should handle createCoupon.fulfilled', async () => {
      const newCoupon = {
        id: 1,
        description: 'NEWCOUPON',
        percentage: 1,
        expirationDate: '2024-02-01',
        applicableProducts: [1, 2],
      };
      (axios.post as any).mockResolvedValueOnce({ data: newCoupon });

      await store.dispatch(createCoupon({ newCoupon, token: 'testToken' }));
      const { coupons } = store.getState();
      expect(coupons.loading).toBe(false);
      expect(coupons.coupons).toContainEqual(newCoupon);
    });

    it('should handle createCoupon.rejected', async () => {
      const error = 'Failed to create coupon';
      (axios.post as any).mockRejectedValueOnce(new Error(error));
      const invalidCoupon = {
        description: '',
        percentage: 0,
        expirationDate: '',
        applicableProducts: [],
      };

      await store.dispatch(
        createCoupon({ newCoupon: invalidCoupon, token: 'testToken' })
      );
      const { coupons } = store.getState();
      expect(coupons.loading).toBe(false);
      expect(coupons.error).toBe(error);
    });
  });

  describe('updateCoupon', () => {
    it('should handle updateCoupon.rejected', async () => {
      const error = 'Failed to update coupon';
      (axios.put as any).mockRejectedValueOnce(new Error(error));

      const updatedCoupon = {
        id: 1,
        description: 'UPDATED DESCRIPTION',
        percentage: 10,
        expirationDate: '2024-12-31',
        applicableProducts: [1, 2, 3],
        code: 'UPDATEDCOUPON',
      };

      await store.dispatch(updateCoupon(updatedCoupon));
      const { coupons } = store.getState();
      expect(coupons.error).toBe(error);
    });
  });

  describe('deleteCoupon', () => {
    it('should handle deleteCoupon.fulfilled', async () => {
      const couponId = 1;
      (axios.delete as any).mockResolvedValueOnce({ data: { id: couponId } });

      await store.dispatch(deleteCoupon({ couponId, token: 'testToken' }));
      const { coupons } = store.getState();
      const coupon = coupons.coupons.find((c: any) => c.id === couponId);
      expect(coupon).toBeUndefined();
    });

    it('should handle deleteCoupon.rejected', async () => {
      const error = 'Failed to delete coupon';
      (axios.delete as any).mockRejectedValueOnce(new Error(error));

      await store.dispatch(deleteCoupon({ couponId: 1, token: 'testToken' }));
      const { coupons } = store.getState();
      expect(coupons.error).toBe(error);
    });
  });
});
