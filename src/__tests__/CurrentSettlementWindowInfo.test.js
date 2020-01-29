import React from 'react';
import { render } from '@testing-library/react';
import CurrentSettlementWindowInfo from '../components/CurrentSettlementWindowInfo';

describe('<CurrentSettlementWindowInfo />', () => {
  it('should render without crashing', () => {
    const props = {
      classes: {},
      currentSettlementWindow: { payments: [], receipts: [] },
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<CurrentSettlementWindowInfo {...props} />);
    expect(rendered).toBeTruthy();
  });
});
