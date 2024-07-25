import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import userRoleSlice, {
  fetchUserRoles,
  createUserRole,
  deleteUserRole,
  updateUserRole,
} from '@/features/userRole/userRoleSlice';

vi.mock('axios');

const initialState = {
  roles: [],
  status: 'idle' as 'idle' | 'loading' | 'succeeded',
  error: null as string | null,
};

describe('userRoleSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        userRoles: userRoleSlice,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should have the correct initial state', () => {
    const state = store.getState().userRoles;
    expect(state).toEqual(initialState);
  });

  it('should handle fetchUserRoles.pending', async () => {
    const action = { type: fetchUserRoles.pending.type };
    const state = userRoleSlice(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle fetchUserRoles.fulfilled', async () => {
    const mockRoles = [
      { id: 1, name: 'Admin', permissions: ['read', 'write'] },
      { id: 2, name: 'User', permissions: ['read'] },
    ];

    (axios.get as any).mockResolvedValue({ data: { roles: mockRoles } });

    const action = { type: fetchUserRoles.fulfilled.type, payload: mockRoles };
    const state = userRoleSlice(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.roles).toEqual(mockRoles);
  });

  it('should handle fetchUserRoles.rejected', async () => {
    (axios.get as any).mockRejectedValue(new Error('Failed to fetch roles'));

    const action = {
      type: fetchUserRoles.rejected.type,
      error: { message: 'Failed to fetch roles' },
    };
    const state = userRoleSlice(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch roles');
  });

  it('should handle deleteUserRole.pending', async () => {
    const action = { type: deleteUserRole.pending.type };
    const state = userRoleSlice(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle deleteUserRole.fulfilled', async () => {
    const existingRoles = [
      { id: 1, name: 'Admin', permissions: ['read', 'write'] },
      { id: 2, name: 'User', permissions: ['read'] },
    ];

    (axios.delete as any).mockResolvedValue({});

    const action = { type: deleteUserRole.fulfilled.type, payload: 1 };
    const state = userRoleSlice(
      { ...initialState, roles: existingRoles },
      action
    );

    expect(state.roles).toEqual([
      { id: 2, name: 'User', permissions: ['read'] },
    ]);
  });

  it('should handle deleteUserRole.rejected', async () => {
    (axios.delete as any).mockRejectedValue(new Error('Failed to delete role'));

    const action = {
      type: deleteUserRole.rejected.type,
      error: { message: 'Failed to delete role' },
    };
    const state = userRoleSlice(
      {
        ...initialState,
        roles: [{ id: 1, name: 'Admin', permissions: ['read', 'write'] }],
      },
      action
    );

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to delete role');
  });

  it('should handle createUserRole.pending', async () => {
    const action = { type: createUserRole.pending.type };
    const state = userRoleSlice(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle createUserRole.fulfilled', async () => {
    const newRole = { id: 3, name: 'Editor', permissions: ['read', 'write'] };

    (axios.post as any).mockResolvedValue({ data: { role: newRole } });

    const action = { type: createUserRole.fulfilled.type, payload: newRole };
    const state = userRoleSlice({ ...initialState, roles: [] }, action);

    expect(state.roles).toEqual([newRole]);
  });

  it('should handle updateUserRole.pending', async () => {
    const action = { type: updateUserRole.pending.type };
    const state = userRoleSlice(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle updateUserRole.fulfilled', async () => {
    const existingRoles = [
      { id: 1, name: 'Admin', permissions: ['read', 'write'] },
      { id: 2, name: 'User', permissions: ['read'] },
    ];

    const updatedRole = {
      id: 1,
      name: 'Super Admin',
      permissions: ['read', 'write', 'delete'],
    };

    (axios.put as any).mockResolvedValue({ data: updatedRole });

    const action = {
      type: updateUserRole.fulfilled.type,
      payload: updatedRole,
    };
    const state = userRoleSlice(
      { ...initialState, roles: existingRoles },
      action
    );

    expect(state.roles).toEqual([
      updatedRole,
      { id: 2, name: 'User', permissions: ['read'] },
    ]);
  });

  it('should handle updateUserRole.rejected', async () => {
    (axios.put as any).mockRejectedValue(new Error('Failed to update role'));

    const action = {
      type: updateUserRole.rejected.type,
      error: { message: 'Failed to update role' },
    };
    const state = userRoleSlice(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to update role');
  });
});
