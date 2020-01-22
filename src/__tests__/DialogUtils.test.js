import React from 'react';
import { render } from '@testing-library/react';
import DialogUtils from '../components/DialogUtils';

describe('<DialogUtils />', () => {
  it('should render without crashing', () => {
    const rendered = render(<DialogUtils />);
    expect(rendered).toBeTruthy();
  });
});
