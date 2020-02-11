import React from 'react';
import { render } from '@testing-library/react';
import SettlementsList from '../components/SettlementsList';

describe('<SettlementsList />', () => {
  it('should render without crashing', () => {
    const props = {
      fsp: 1,
      fspNamesById: { id: '' },
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<SettlementsList {...props} />);
    expect(rendered).toBeTruthy();
  });
});
