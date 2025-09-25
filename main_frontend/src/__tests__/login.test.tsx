import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginPage from '@/app/auth/login/page';
import * as api from '@/lib/api';

jest.mock('@/lib/api');

// Mock next/navigation's useRouter
const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs in successfully and navigates to dashboard', async () => {
    (api.login as jest.Mock).mockResolvedValue({ token: 'test' });

    render(<LoginPage />);

    await userEvent.type(screen.getByPlaceholderText(/you@example.com/i), 'john@doe.com');
    await userEvent.type(screen.getByPlaceholderText(/•{3,}/i), 'secret123');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith({ email: 'john@doe.com', password: 'secret123' });
      expect(mockReplace).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows an error when login fails', async () => {
    (api.login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    render(<LoginPage />);

    await userEvent.type(screen.getByPlaceholderText(/you@example.com/i), 'john@doe.com');
    await userEvent.type(screen.getByPlaceholderText(/•{3,}/i), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
