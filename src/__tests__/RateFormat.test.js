import React from 'react';
import { render } from '@testing-library/react';
import RateFormat from '../components/RateFormat';

describe('<RateFormat />', () => {
  it('should render without crashing', () => {
    const props = {
      inputRef: () => {},
      onChange: () => {},
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<RateFormat {...props} />);
    expect(rendered).toBeTruthy();
  });
});
