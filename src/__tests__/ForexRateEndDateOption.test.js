import React from 'react';
import { render } from '@testing-library/react';
import { DateTime } from 'luxon';
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
  it('should display the correct end date given the 1 Day option', async () => {
    const tomorrow8amUTC = String(DateTime.utc()
      .plus({ days: 1 })
      .set({
        hour: 8,
        minute: 0,
        second: 0,
        millisecond: 0,
      }));
    const { findAllByText } = render(<ForexRateEndDateOption />);
    const endDateForOneDay = await findAllByText('End Date')[0];
    expect(endDateForOneDay.value).toEqual(tomorrow8amUTC);
  });
});
