import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import * as api from '@/lib/api';

jest.mock('@/lib/api');

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads recent entries and shows computed average', async () => {
    const items = [
      { id: '1', intensity: 4, location: 'Back', occurredAt: new Date().toISOString() },
      { id: '2', intensity: 8, location: 'Head', occurredAt: new Date().toISOString() },
      { id: '3', intensity: 6, location: 'Neck', occurredAt: new Date().toISOString() },
    ];
    (api.listPain as jest.Mock).mockResolvedValue(items);

    render(<DashboardPage />);

    // Labels present
    expect(screen.getByText(/Average Intensity/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent Entries/i)).toBeInTheDocument();

    // Average = (4 + 8 + 6) / 3 = 6.0
    await waitFor(() => {
      expect(screen.getByText('6.0')).toBeInTheDocument();
      expect(screen.getByText(String(items.length))).toBeInTheDocument();
    });

    // Link to history
    const link = screen.getByRole('link', { name: /view full history/i });
    expect(link).toHaveAttribute('href', '/history');

    // Should render "Recent" section title
    expect(screen.getByText(/Log a new entry/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent/i)).toBeInTheDocument();
  });

  it('handles load error by showing defaults and empty state', async () => {
    (api.listPain as jest.Mock).mockRejectedValue(new Error('Server down'));

    render(<DashboardPage />);

    expect(await screen.findByText(/No entries yet\./i)).toBeInTheDocument();
    // avg defaults to 0
    expect(screen.getAllByText('0').length).toBeGreaterThan(0);
  });
});
