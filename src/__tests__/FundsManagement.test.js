import React from 'react';
import { render } from '@testing-library/react';
import FundsManagement from '../components/FundsManagement';

describe('<FundsManagement />', () => {
  it('should render without crashing', () => {
    const props = {
      fspName: '',
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<FundsManagement {...props} />);
    expect(rendered).toBeTruthy();
  });
});
