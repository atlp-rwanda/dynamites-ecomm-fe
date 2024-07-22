import { describe, it, expect } from 'vitest';
import productsReducer, {
  initialState,
  fetchBuyers,
} from '@/app/Dashboard/buyerSlice';

describe('Buyer reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'unknown/action' };
    expect(productsReducer(undefined, action)).toEqual(initialState);
  });

  it('should handle fetchBuyer pending', () => {
    expect(
      productsReducer(initialState, {
        type: fetchBuyers.pending.type,
      })
    ).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle fetchBuyer fulfilled', () => {
    const mockBuyers = [
      {
        id: 1,
        firstName: 'Tresor',
        lastName: '',
        email: '',
        userType: { id: '', name: '', permissions: [] },
        googleId: null,
        facebookId: null,
        picture: '',
        provider: null,
        isVerified: false,
        status: '',
        twoFactorCode: null,
        updatedAt: '',
        password: '',
      },
      {
        id: 2,
        firstName: 'Xavier',
        lastName: '',
        email: '',
        userType: { id: '', name: '', permissions: [] },
        googleId: null,
        facebookId: null,
        picture: '',
        provider: null,
        isVerified: false,
        status: '',
        twoFactorCode: null,
        updatedAt: '',
        password: '',
      },
    ];
    expect(
      productsReducer(initialState, {
        type: fetchBuyers.fulfilled.type,
        payload: mockBuyers,
      })
    ).toEqual({
      ...initialState,
      status: 'succeeded',
      buyers: mockBuyers,
    });
  });

  it('should handle fetchBuyers.rejected', () => {
    const errorMessage = 'Failed to fetch buyers';
    expect(
      productsReducer(initialState, {
        type: fetchBuyers.rejected.type,
        payload: errorMessage,
      })
    ).toEqual({
      ...initialState,
      status: 'failed',
      error: errorMessage,
    });
  });
});
