import React from 'react';
import { render } from '@testing-library/react';
import DatePicker from '../components/DatePicker';

describe('<CurrentSettlementWindowInfo />', () => {
  it('should render without crashing', () => {
    const rendered = render(<DatePicker />);
    expect(rendered).toBeTruthy();
  });
});
