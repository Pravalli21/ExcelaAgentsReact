// App.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';

describe('App component', () => {
  let axiosMock;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  test('renders "Find a Train" heading and displays table after clicking Find button', async () => {
    axiosMock.onGet(/\/trains/).reply(200, [
      {
        _id: '1',
        name: 'Sample Train',
        source: 'Source Station',
        destination: 'Destination Station',
        seq: 1,
        station: 'Sample Station',
        arrival: '12:00',
        departure: '12:30',
        distance: 50,
      },
    ]);

    render(<App />);

    // Check if "Find a Train" heading is present
    const headingElement = screen.getByText('Find a Train');
    expect(headingElement).toBeInTheDocument();

    // Enter train number and click "Find" button
    const inputElement = screen.getByPlaceholderText('Enter train number');
    fireEvent.change(inputElement, { target: { value: '123' } });

    const findButton = screen.getByText('Find');
    fireEvent.click(findButton);

    // Wait for the table to be displayed
    await waitFor(() => {
      // Check if the table is present
      expect(screen.getByText('Train: Sample Train')).toBeInTheDocument();
      expect(screen.getByText('From: Source Station')).toBeInTheDocument();
      expect(screen.getByText('To: Destination Station')).toBeInTheDocument();
      expect(screen.getByText('Sample Station')).toBeInTheDocument();
    });

    // Check if the table rows are displayed
    
    expect(screen.getByText('Station')).toBeInTheDocument();
    expect(screen.getByText('Arrival')).toBeInTheDocument();
    expect(screen.getByText('Departure')).toBeInTheDocument();
    expect(screen.getByText('Distance')).toBeInTheDocument();
  });
});
