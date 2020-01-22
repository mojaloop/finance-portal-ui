import React from 'react';
import { render } from '@testing-library/react';
import SettlementsList from '../components/SettlementsList';

describe('<SettlementsList />', () => {
  it('should render without crashing', () => {
    const rendered = render(<SettlementsList />);
    expect(rendered).toBeTruthy();
  });
});
