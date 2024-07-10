import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  passwordRequestReducer,
  passwordResetReducer,
  requestPasswordReset,
  resetPassword,
} from '@/features/Auth/password';

describe('authSlices', () => {
  let store = configureStore({
    reducer: {
      passwordRequest: passwordRequestReducer,
      passwordReset: passwordResetReducer,
    },
  });
  let httpMock: MockAdapter;

  beforeAll(() => {
    httpMock = new MockAdapter(axios);
  });

  beforeEach(() => {
    store = configureStore({
      reducer: {
        passwordRequest: passwordRequestReducer,
        passwordReset: passwordResetReducer,
      },
    });
  });

  afterEach(() => {
    httpMock.reset();
  });

  it('should have the correct initial state', () => {
    expect(store.getState().passwordRequest).toEqual({
      status: 'idle',
      error: null,
    });
    expect(store.getState().passwordReset).toEqual({
      status: 'idle',
      error: null,
    });
  });

  describe('requestPasswordReset action', () => {
    it('handles requestPasswordReset action when fulfilled', async () => {
      const mockEmail = 'test@example.com';
      const mockResponse = { message: 'Recovery email sent.' };
      httpMock.onPost().reply(200, mockResponse);

      await store.dispatch(requestPasswordReset(mockEmail));
      const state = store.getState().passwordRequest;
      expect(state.status).toEqual('succeeded');
    });

    it('handles requestPasswordReset action when rejected', async () => {
      const mockEmail = 'test@example.com';
      const mockError = { message: 'User not found.' };
      httpMock.onPost().reply(400, mockError);

      await store.dispatch(requestPasswordReset(mockEmail));
      const state = store.getState().passwordRequest;
      expect(state.status).toEqual('failed');
      expect(state.error).toEqual(mockError.message);
    });
  });

  describe('resetPassword action', () => {
    it('handles resetPassword action when fulfilled', async () => {
      const mockPayload = { token: 'validToken', password: 'newPassword' };
      const mockResponse = { message: 'Password reset successfully.' };
      httpMock.onPut().reply(200, mockResponse);

      await store.dispatch(resetPassword(mockPayload));
      const state = store.getState().passwordReset;
      expect(state.status).toEqual('succeeded');
    });

    it('handles resetPassword action when rejected', async () => {
      const mockPayload = { token: 'invalidToken', password: 'newPassword' };
      const mockError = { message: 'Invalid token.' };
      httpMock.onPut().reply(400, mockError);

      await store.dispatch(resetPassword(mockPayload));
      const state = store.getState().passwordReset;
      expect(state.status).toEqual('failed');
      expect(state.error).toEqual(mockError.message);
    });
  });
});
