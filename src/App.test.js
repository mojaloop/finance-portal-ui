import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
