import React from 'react';
import { render } from '@testing-library/react';
import { DialogTitle, DialogContent, DialogActions } from '../components/DialogUtils';

describe('<DialogTitle />', () => {
  it('should render without crashing', () => {
    const rendered = render(<DialogTitle />);
    expect(rendered).toBeTruthy();
  });
});

describe('<DialogContent />', () => {
  it('should render without crashing', () => {
    const rendered = render(<DialogContent />);
    expect(rendered).toBeTruthy();
  });
});

describe('<DialogActions />', () => {
  it('should render without crashing', () => {
    const rendered = render(<DialogActions />);
    expect(rendered).toBeTruthy();
  });
});
