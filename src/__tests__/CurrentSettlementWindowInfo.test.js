import React from 'react';
import { render } from '@testing-library/react';
import CurrentSettlementWindowInfo from '../components/CurrentSettlementWindowInfo';

describe('<CurrentSettlementWindowInfo />', () => {
  it('should render without crashing', () => {
    const rendered = render(<CurrentSettlementWindowInfo />);
    expect(rendered).toBeTruthy();
  });
});
