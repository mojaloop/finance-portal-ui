import React from 'react';
import { render } from '@testing-library/react';
import Login from '../components/Login';

describe('<Login />', () => {
  it('should render without crashing', () => {
    const props = {
      loginSuccessful: () => {},
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<Login {...props} />);
    expect(rendered).toBeTruthy();
  });
});
