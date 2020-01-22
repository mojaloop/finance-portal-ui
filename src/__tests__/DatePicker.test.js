import React from 'react';
import { render } from '@testing-library/react';
import { DatePicker, DateRangePicker } from '../components/DatePicker';

describe('<CurrentSettlementWindowInfo />', () => {
  it('should render without crashing', () => {
    const rendered = render(<DatePicker />);
    expect(rendered).toBeTruthy();
  });
});

xdescribe('<DateRangePicker />', () => {
  it('should render without crashing', () => {
    const rendered = render(<DateRangePicker />);
    expect(rendered).toBeTruthy();
  });
});
