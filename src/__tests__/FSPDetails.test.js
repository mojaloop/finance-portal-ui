import React from 'react';
import { render } from '@testing-library/react';
import FSPDetails from '../components/FSPDetails';

describe('<FSPDetails />', () => {
  it('should render without crashing', () => {
    const props = {
      classes: { paper: '' },
      fsp: { id: '', name: '' },
      fspNamesById: { id: '' },
      setSnackBarParams: () => {},
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<FSPDetails {...props} />);
    expect(rendered).toBeTruthy();
  });
});
