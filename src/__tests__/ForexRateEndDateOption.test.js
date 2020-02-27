import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const { findByLabelText } = render(<ForexRateEndDateOption />);
    const endDateForOneDay = await findByLabelText('End Date');
    const expected = true;
    const actual = endDateForOneDay.disabled;
    expect(actual).toEqual(expected);
  });
  it('should display the correct title, "1 Day", given the 1 Day option', async () => {
    const { findByText } = render(<ForexRateEndDateOption />);
    const element = await findByText('1 Day');
    expect(element).toBeDefined();
  });
  it('should display the right end date given the 1 Day option', async () => {
    const tomorrow8amUTC = DateTime.utc()
      .plus({ days: 1 })
      .set({
        hour: 8,
        minute: 30,
        second: 0,
        millisecond: 0,
      });
    const { findByLabelText } = render(<ForexRateEndDateOption />);
    const endDateForOneDay = await findByLabelText('End Date');
    const expected = dateToStr(tomorrow8amUTC);
    const actual = endDateForOneDay.value;
    expect(actual).toEqual(expected);
  });
  it('should enable the date picker input given the Weekend option', async () => {
    const { findByLabelText } = render(<ForexRateEndDateOption weekend />);
    const endDateForWeekend = await findByLabelText('End Date');
    const expected = false;
    const actual = endDateForWeekend.disabled;
    expect(actual).toEqual(expected);
  });
  it('should display the correct title, "Weekend", given the Weekend option', async () => {
    const { findByText } = render(<ForexRateEndDateOption weekend />);
    const element = await findByText('Weekend');
    expect(element).toBeDefined();
  });
  it('should display the right initial end date given the Weekend option', async () => {
    const monday8amUTC = DateTime.utc()
      .plus({ days: 3 })
      .set({
        hour: 8,
        minute: 30,
        second: 0,
        millisecond: 0,
      });
    const { findByLabelText } = render(<ForexRateEndDateOption weekend />);
    const endDateForOneDay = await findByLabelText('End Date');
    const expected = dateToStr(monday8amUTC);
    const actual = endDateForOneDay.value;
    expect(actual).toEqual(expected);
  });
  it('should run the onCommit function when the commit button is pressed', async () => {
    const onCommitMock = jest.fn();
    const { findByText } = render(<ForexRateEndDateOption onCommit={onCommitMock} />);
    const commitButton = await findByText('Commit');
    fireEvent.click(commitButton);
    expect(onCommitMock).toHaveBeenCalled();
  });
});
