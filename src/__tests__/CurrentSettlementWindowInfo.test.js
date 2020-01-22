// TODO: Work through props required for successful rendering
import React from 'react';
import { render } from '@testing-library/react';
import CurrentSettlementWindowInfo from '../components/CurrentSettlementWindowInfo';

xdescribe('<CurrentSettlementWindowInfo />', () => {
  it('should render without crashing', () => {
    const rendered = render(<CurrentSettlementWindowInfo />);
    expect(rendered).toBeTruthy();
  });
});
