import React from 'react';
import { render } from '@testing-library/react';
import ForexRateEntry, {
  floatToIntDestructive, hasMax4DecimalPlaces, hiddenConfirmDialog, rateInputToInt, receivedAmount,
} from '../components/ForexRateEntry';

describe('receivedAmount(rate)', () => {
  it('should return the amount received in MAD', () => {
    const rate = 11.121;
    const expected = '556.05';
    const actual = receivedAmount(rate);
    expect(actual).toEqual(expected);
  });
  it('should round the returned amount to two decimal places', () => {
    const rate = 11.1211;
    const expected = '556.06';
    const actual = receivedAmount(rate);
    expect(actual).toEqual(expected);
  });
  it('should pad an integer returned amount to two decimal places', () => {
    const rate = 10;
    const expected = '500.00';
    const actual = receivedAmount(rate);
    expect(actual).toEqual(expected);
  });
  it('should pad a single decimal returned amount with a trailing zero', () => {
    const rate = 11.23;
    const expected = '561.50';
    const actual = receivedAmount(rate);
    expect(actual).toEqual(expected);
  });
});

describe('floatToIntDestructive(float)', () => {
  it('should return an integer comprised of all the digits of a given float', () => {
    const f = 1111.5555;
    const i = 11115555;
    const expected = i;
    const actual = floatToIntDestructive(f);
    expect(actual).toEqual(expected);
  });
});

describe('hasMax4DecimalPlaces(number)', () => {
  it('should return true if a number has 4 decimal places', () => {
    const number = 1.2345;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if a number has 3 decimal places', () => {
    const number = 1.234;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if a number has 2 decimal places', () => {
    const number = 1.23;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if a number has 1 decimal places', () => {
    const number = 1.2;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if a number has no decimal places', () => {
    const number = 1;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return false if a number has 5 decimal places', () => {
    const number = 1.23456;
    const expected = false;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  // The following test cases exist because of JS math quirks
  // TODO: Determine how to write a generative test from 1.0 to 9999.9999
  it('should return true if given 1.1', () => {
    const number = 1.1;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if given 1.11', () => {
    const number = 1.11;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if given 2.2', () => {
    const number = 2.2;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if given 2.111', () => {
    const number = 2.2;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if given 0', () => {
    const number = 0;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if given 0.0', () => {
    const number = 0.0;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if given 0.01', () => {
    const number = 0.01;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if given 0.0100', () => {
    const number = 0.0100;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
  it('should return true if given 0.11', () => {
    const number = 0.11;
    const expected = true;
    const actual = hasMax4DecimalPlaces(number);
    expect(actual).toEqual(expected);
  });
});

describe('rateInputToInt(rateInput)', () => {
  it('should return an integer rate given a 4-decimal places rate input', () => {
    const inputRate = 111.5555;
    const expected = 1115555;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should return an integer rate given a 3-decimal places rate input', () => {
    const inputRate = 111.555;
    const expected = 1115550;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should return an integer rate given a 2-decimal places rate input', () => {
    const inputRate = 111.55;
    const expected = 1115500;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should return an integer rate given a 1-decimal place rate input', () => {
    const inputRate = 111.5;
    const expected = 1115000;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should return an integer rate given a non-fractional rate input', () => {
    const inputRate = 111;
    const expected = 1110000;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should return an integer rate given a zero rate input', () => {
    const inputRate = 0;
    const expected = 0;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should return an integer rate given a sub-zero rate input', () => {
    const inputRate = 0.1;
    const expected = 1000;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should return an integer rate given a small sub-zero rate input', () => {
    const inputRate = 0.01;
    const expected = 100;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should return an integer rate given a smaller sub-zero rate input', () => {
    const inputRate = 0.001;
    const expected = 10;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should return an integer rate given the smallest sub-zero rate input', () => {
    const inputRate = 0.0001;
    const expected = 1;
    const actual = rateInputToInt(inputRate);
    expect(actual).toEqual(expected);
  });
  it('should throw an error when given a rate that has more than four decimal places', () => {
    const inputRate = 111.55551;
    expect(() => rateInputToInt(inputRate))
      .toThrow('Precision only takes into account up to 4 decimal places');
  });
  it('should return 0 when given a nonsensical rate input', () => {
    expect(rateInputToInt('')).toEqual(0);
  });
});

describe('hiddenConfirmDialog()', () => {
  it('should return a setConfirmDialog object that results in a hidden ConfirmDialog', () => {
    const expected = {
      visible: false,
      description: '',
      onConfirm: () => {},
    };
    const actual = hiddenConfirmDialog();
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
  });
});

describe('<ForexRateEntry />', () => {
  it('should render without crashing', () => {
    const rendered = render(<ForexRateEntry onCommit={() => {}} />);
    expect(rendered).toBeTruthy();
  });
  it('should have a rate input field', async () => {
    const { findByText } = render(<ForexRateEntry onCommit={() => {}} />);
    const element = await findByText('Rate');
    expect(element).toBeDefined();
  });
  it('should have a start date input field', async () => {
    const { findByText } = render(<ForexRateEntry onCommit={() => {}} />);
    const element = await findByText('Start Date');
    expect(element).toBeDefined();
  });
  it('should display two end date options', async () => {
    const { findAllByText } = render(<ForexRateEntry onCommit={() => {}} />);
    const commitButtons = await findAllByText('Commit');
    expect(commitButtons).toHaveLength(2);
  });
  it('should display a sample calculation using the given rate', async () => {
    const { findByText } = render(<ForexRateEntry onCommit={() => {}} />);
    const element = await findByText('Sample Exchange Estimate');
    expect(element).toBeDefined();
  });
});
