import React from 'react';
import { render } from '@testing-library/react';
import SnackbarUtils from '../components/SnackbarUtils';

describe('<SnackbarUtils />', () => {
  it('should render without crashing', () => {
    const props = {
      classes: {
        close: '', icon: '', iconVariant: '', message: '',
      },
      variant: 'success',
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<SnackbarUtils {...props} />);
    expect(rendered).toBeTruthy();
  });
});
