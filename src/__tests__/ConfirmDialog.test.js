import React from 'react';
import { render } from '@testing-library/react';
import ConfirmDialog from '../components/ConfirmDialog';

describe('<ConfirmDialog />', () => {
  it('should render without crashing', () => {
    const rendered = render(<ConfirmDialog />);
    expect(rendered).toBeTruthy();
  });
});
