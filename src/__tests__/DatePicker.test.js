import React from 'react';
import { render } from '@testing-library/react';
import { DateTime } from 'luxon';
import DatePicker, { dateToStr, strToDate } from '../components/DatePicker';

describe('<DatePicker />', () => {
  it('should render without crashing', () => {
    const epochFor24Jan2020 = 1579870320000;

    const props = {
      classes: {},
      defDate: new Date(epochFor24Jan2020),
      desc: '',
      onChange: () => {},
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<DatePicker {...props} />);
    expect(rendered).toBeTruthy();
  });
});

describe('strToDate(datestr)', () => {
  it('should return a proper DateTime (luxon) object from a date string', () => {
    const datestr = '2020-01-24';
    const expected = '2020-01-24T00:00:00.000Z';
    const actual = strToDate(datestr).toISO();
    expect(actual).toEqual(expected);
  });
  it('should return a proper DateTime (luxon) object from a date string in February', () => {
    const datestr = '2020-02-22';
    const expected = '2020-02-22T00:00:00.000Z';
    const actual = strToDate(datestr).toISO();
    expect(actual).toEqual(expected);
  });
  it('should return a proper DateTime (luxon) object from a date string in March', () => {
    const datestr = '2020-03-22';
    const expected = '2020-03-22T00:00:00.000Z';
    const actual = strToDate(datestr).toISO();
    expect(actual).toEqual(expected);
  });
  it('should return a proper DateTime (luxon) object from a date string with a single digit day',
    () => {
      const datestr = '2020-01-03';
      const expected = '2020-01-03T00:00:00.000Z';
      const actual = strToDate(datestr).toISO();
      expect(actual).toEqual(expected);
    });
});

describe('dateToStr(dt)', () => {
  it('should return the string representation (YYYY-MM-DD) of a given Date object', () => {
    const epochFor24Jan2020 = 1579870320000;
    const dt = new Date(epochFor24Jan2020);
    const expected = '2020-01-24';
    const actual = dateToStr(dt);
    expect(actual).toEqual(expected);
  });
  it('should correctly pad a string representation of a given Date object', () => {
    const epochFor24Jan2020 = 1579870320000;
    const dt = new Date(epochFor24Jan2020);
    dt.setDate(dt.getDate() + 322);
    const expected = '2020-12-11';
    const actual = dateToStr(dt);
    expect(actual).toEqual(expected);
  });
  it('should return the string representation (YYYY-MM-DD) of a given DateTime (luxon) object', () => {
    const epochFor24Jan2020 = 1579870320000;
    const dt = DateTime.fromMillis(epochFor24Jan2020);
    const expected = '2020-01-24';
    const actual = dateToStr(dt);
    expect(actual).toEqual(expected);
  });
  it('should correctly pad a string representation of a given DateTime (luxon) object', () => {
    const epochFor24Jan2020 = 1579870320000;
    const dt = DateTime.fromMillis(epochFor24Jan2020).plus({ days: 322 });
    const expected = '2020-12-11';
    const actual = dateToStr(dt);
    expect(actual).toEqual(expected);
  });
  it('should correctly pad a string representation of a given DateTime (luxon) object with a'
    + 'single-digit day', () => {
    const epochFor24Jan2020 = 1579870320000;
    const dt = DateTime.fromMillis(epochFor24Jan2020).plus({ days: 37 });
    const expected = '2020-03-01';
    const actual = dateToStr(dt);
    expect(actual).toEqual(expected);
  });
  it('should throw an error if a type w/o expected attributes is supplied as an argument', () => {
    const dt = '';
    const expected = 'This function requires a suitable date object as an argument';
    expect(() => dateToStr(dt)).toThrow(expected);
  });
  it('should throw an error if null or undefined is supplied as an argument', () => {
    const undefinedDt = undefined;
    const nullDt = null;
    const expected = 'This function requires a suitable date object as an argument';
    expect(() => dateToStr(undefinedDt)).toThrow(expected);
    expect(() => dateToStr(nullDt)).toThrow(expected);
  });
});
