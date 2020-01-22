import React from 'react';
import { render } from '@testing-library/react';
import SnackbarUtils from '../components/SnackbarUtils';

describe('<SnackbarUtils />', () => {
  it('should render without crashing', () => {
    const rendered = render(<SnackbarUtils />);
    expect(rendered).toBeTruthy();
  });
});
