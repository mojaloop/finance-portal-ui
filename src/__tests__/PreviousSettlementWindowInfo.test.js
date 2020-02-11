import React from 'react';
import { render } from '@testing-library/react';
import PreviousSettlementWindowInfo from '../components/PreviousSettlementWindowInfo';

describe('<PreviousSettlementWindowInfo />', () => {
  it('should render without crashing', () => {
    const props = {
      classes: {},
      previousSettlementWindow: {
        payments: { num: '', value: '' },
        receipts: { num: '', value: '' },
        limits: { value: '' },
        netPositions: [{}],
      },
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<PreviousSettlementWindowInfo {...props} />);
    expect(rendered).toBeTruthy();
  });
});
