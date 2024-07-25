import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import axios from 'axios';
import TableUserRole from '@/components/dashBoard/UserRole';
import { showErrorToast } from '@/utils/ToastConfig';
import userRoleSlice from '@/features/userRole/userRoleSlice';

vi.mock('@/utils/ToastConfig', () => ({
  showErrorToast: vi.fn(),
  showSuccessToast: vi.fn(),
}));

vi.mock('axios');

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      userRoles: userRoleSlice,
    },
  });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('TableUserRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (axios.get as jest.Mock).mockResolvedValue({
      data: { data: [{ id: 1, name: 'Admin', permissions: [] }] },
    });
  });

  it('renders TableUserRole component', () => {
    renderWithProviders(<TableUserRole />);
    expect(screen.getByText('Register Role')).toBeInTheDocument();
  });

  it('fetches all roles on mount', async () => {
    renderWithProviders(<TableUserRole />);
    await waitFor(() => {
      expect(screen.getByText('Register Role')).toBeInTheDocument();
    });
  });

  it('shows error when role name is empty', async () => {
    renderWithProviders(<TableUserRole />);

    fireEvent.click(screen.getByText('Add Role'));

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith('Role name cannot be empty');
    });
  });

  it('adds and removes permissions', async () => {
    renderWithProviders(<TableUserRole />);

    const permissionInput = screen.getByPlaceholderText('Enter permissions');
    fireEvent.change(permissionInput, { target: { value: 'Permission 1' } });
    fireEvent.click(screen.getByText('+ Add Permissions'));

    expect(screen.getByText('Permission 1')).toBeInTheDocument();

    const removePermissionButton = screen.getByText('X', {
      selector: 'button',
    });
    fireEvent.click(removePermissionButton);

    await waitFor(() => {
      expect(screen.queryByText('Permission 1')).not.toBeInTheDocument();
    });
  });

  it('adds a new role successfully', async () => {
    renderWithProviders(<TableUserRole />);

    const roleNameInput = screen.getByPlaceholderText('Role Name');
    const permissionInput = screen.getByPlaceholderText('Enter permissions');
    const addPermissionsButton = screen.getByText('+ Add Permissions');
    const addRoleButton = screen.getByText('Add Role');

    fireEvent.change(roleNameInput, { target: { value: 'New Role' } });
    fireEvent.change(permissionInput, { target: { value: 'Permission 1' } });
    fireEvent.click(addPermissionsButton);

    fireEvent.click(addRoleButton);

    await waitFor(() => {
      expect(screen.queryByText('Permission 1')).not.toBeInTheDocument();
    });
  });
});
