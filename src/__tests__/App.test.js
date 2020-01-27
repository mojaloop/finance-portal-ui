import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  it('should render without crashing', () => {
    const rendered = render(<App />);
    expect(rendered).toBeTruthy();
  });
  it('should display the Forex Rates tab when it is selected', async () => {
    const { getByText, findByText } = render(<App storybookMode getUserInfo={() => ({})} />);
    fireEvent.click(getByText('Forex Rates'));

    const element = await findByText('Forex Rates Tab');
    expect(element).toBeDefined();
  });
});
