import React from 'react';
import { render } from '@testing-library/react';
import Login from '../components/Login';

describe('<Login />', () => {
  it('should render without crashing', () => {
    const rendered = render(<Login />);
    expect(rendered).toBeTruthy();
  });
});
