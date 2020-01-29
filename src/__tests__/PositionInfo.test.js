import React from 'react';
import { render } from '@testing-library/react';
import PositionInfo from '../components/PositionInfo';

describe('<PositionInfo />', () => {
  it('should render without crashing', () => {
    const props = {
      positions: [],
      settlementAccountBalance: [],
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<PositionInfo {...props} />);
    expect(rendered).toBeTruthy();
  });
});
