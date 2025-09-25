import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from '@/app/profile/page';
import * as api from '@/lib/api';

jest.mock('@/lib/api');

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

describe('Profile Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads profile and updates successfully', async () => {
    (api.getProfile as jest.Mock).mockResolvedValue({
      email: 'john@doe.com',
      name: 'John',
      bio: 'Hi there',
    });
    (api.updateProfile as jest.Mock).mockResolvedValue({ message: 'ok' });

    render(<ProfilePage />);

    // Wait for profile fields to be populated (email is disabled but has value)
    expect(await screen.findByDisplayValue('john@doe.com')).toBeInTheDocument();
    const nameInput = screen.getByPlaceholderText(/Your name/i);
    const bioInput = screen.getByPlaceholderText(/A brief description about you/i);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Jane');
    await userEvent.clear(bioInput);
    await userEvent.type(bioInput, 'Bio updated');

    await userEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(api.updateProfile).toHaveBeenCalledWith({ name: 'Jane', bio: 'Bio updated' });
    expect(await screen.findByText(/Profile updated/i)).toBeInTheDocument();
  });

  it('logs out and navigates to login', async () => {
    (api.getProfile as jest.Mock).mockResolvedValue({
      email: 'john@doe.com',
      name: 'John',
      bio: 'Hi there',
    });
    (api.logout as jest.Mock).mockResolvedValue({});

    render(<ProfilePage />);

    await screen.findByDisplayValue('john@doe.com');

    await userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(api.logout).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith('/auth/login');
  });
});
