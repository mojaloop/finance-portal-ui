// TODO: Work through props required for successful rendering
import React from 'react';
import { render } from '@testing-library/react';
import TransactionAverage from '../components/TransactionAverage';

xdescribe('<TransactionAverage />', () => {
  it('should render without crashing', () => {
    const rendered = render(<TransactionAverage />);
    expect(rendered).toBeTruthy();
  });
});
