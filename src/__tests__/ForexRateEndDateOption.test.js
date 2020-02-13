import React from 'react';
import { render } from '@testing-library/react';
import ForexRateEndDateOption from '../components/ForexRateEndDateOption';

describe('<ForexRateEndDateOption />', () => {
  it('should render without crashing', () => {
    const rendered = render(<ForexRateEndDateOption />);
    expect(rendered).toBeTruthy();
  });
  it('should have a commit button', async () => {
    const { findByText } = render(<ForexRateEndDateOption />);
    const element = await findByText('Commit');
    expect(element).toBeDefined();
  });
});
