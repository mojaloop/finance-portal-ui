// TODO: Work through props required for successful rendering
import React from 'react';
import { render } from '@testing-library/react';
import SnackbarUtils from '../components/SnackbarUtils';

xdescribe('<SnackbarUtils />', () => {
  it('should render without crashing', () => {
    const rendered = render(<SnackbarUtils />);
    expect(rendered).toBeTruthy();
  });
});
