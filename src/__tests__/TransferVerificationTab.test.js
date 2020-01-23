import React from 'react';
import { render } from '@testing-library/react';
import TransferVerificationTab from '../components/TransferVerificationTab';

describe('<TransferVerificationTab />', () => {
  it('should render without crashing', () => {
    const rendered = render(<TransferVerificationTab />);
    expect(rendered).toBeTruthy();
  });
});
