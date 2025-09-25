import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryPage from '@/app/history/page';
import * as api from '@/lib/api';

jest.mock('@/lib/api');

describe('History Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders list of entries and allows deletion', async () => {
    const entries = [
      { id: 'a', intensity: 7, location: 'Knee', occurredAt: new Date().toISOString() },
      { id: 'b', intensity: 3, location: 'Shoulder', occurredAt: new Date().toISOString() },
    ];
    (api.listPain as jest.Mock).mockResolvedValue(entries);
    (api.deletePain as jest.Mock).mockResolvedValue({});

    render(<HistoryPage />);

    // Wait for items to load
    expect(await screen.findByText(/Knee/i)).toBeInTheDocument();
    expect(screen.getByText(/Shoulder/i)).toBeInTheDocument();

    // Delete the first item
    const listItem = screen.getByText(/Knee/i).closest('li')!;
    const delBtn = within(listItem).getByRole('button', { name: /delete/i });
    await userEvent.click(delBtn);

    await waitFor(() => {
      expect(screen.queryByText(/Knee/i)).not.toBeInTheDocument();
    });
    expect(api.deletePain).toHaveBeenCalledWith('a');
  });

  it('shows error when list loading fails', async () => {
    (api.listPain as jest.Mock).mockRejectedValue(new Error('Boom'));

    render(<HistoryPage />);

    expect(await screen.findByText(/Boom/i)).toBeInTheDocument();
  });
});
