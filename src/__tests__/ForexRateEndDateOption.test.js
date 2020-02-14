import React from 'react';
import { render } from '@testing-library/react';
import { DateTime } from 'luxon';
import { dateToStr } from '../components/DatePicker';
import ForexRateEndDateOption from '../components/ForexRateEndDateOption';

describe('<ForexRateEndDateOption />', () => {
  it('should render without crashing', () => {
    const rendered = render(<ForexRateEndDateOption initialDate={DateTime.utc()} />);
    expect(rendered).toBeTruthy();
  });
  it('should have a commit button', async () => {
    const { findByText } = render(<ForexRateEndDateOption initialDate={DateTime.utc()} />);
    const element = await findByText('Commit');
    expect(element).toBeDefined();
  });
  it('should disable the date picker input given the 1 Day option', async () => {
    const tomorrow8amUTC = DateTime.utc()
      .plus({ days: 1 })
      .set({
        hour: 8,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
    const { findByLabelText } = render(<ForexRateEndDateOption initialDate={tomorrow8amUTC} />);
    const endDateForOneDay = await findByLabelText('End Date');
    const expected = true;
    const actual = endDateForOneDay.disabled;
    expect(actual).toEqual(expected);
  });
  it('should display the right end date given the 1 Day option', async () => {
    const tomorrow8amUTC = DateTime.utc()
      .plus({ days: 1 })
      .set({
        hour: 8,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
    const { findByLabelText } = render(<ForexRateEndDateOption initialDate={tomorrow8amUTC} />);
    const endDateForOneDay = await findByLabelText('End Date');
    const expected = dateToStr(tomorrow8amUTC);
    const actual = endDateForOneDay.value;
    expect(actual).toEqual(expected);
  });
});
