import React from 'react';
import { render } from '@testing-library/react';
import SettlementWindowTransfersTab from '../components/SettlementWindowTransfersTab';

const settlementWindowDetails = {
  settlementWindow: {
    settlementWindowId: 93,
    settlementWindowStateId: 'PENDING_SETTLEMENT',
    amount: '350.9700',
    currencyId: 'EUR,MAD',
    settlementWindowOpen: '2020-02-26T20:42:03.000Z',
    settlementWindowClose: '2020-02-26T20:42:10.000Z',
  },
  participantAmount: [
    {
      fspId: 'DFSPEUR',
      inAmount: '-27.0000',
      currency: 'EUR',
      outAmount: 0,
      netAmount: '-27.0000',
    },
    {
      fspId: 'DFSPMAD',
      inAmount: 0,
      currency: 'MAD',
      outAmount: '323.9700',
      netAmount: '323.9700',
    },
    {
      fspId: 'testfsp3',
      inAmount: 0,
      currency: 'EUR',
      outAmount: '27.0000',
      netAmount: '27.0000',
    },
    {
      fspId: 'testfsp4',
      inAmount: '-323.9700',
      currency: 'MAD',
      outAmount: 0,
      netAmount: '-323.9700',
    },
  ],
  totalAmount: [
    {
      EUR: '27.0000',
    },
    {
      MAD: '323.9700',
    },
  ],
  settlementId: 93,
  relatedSettlementWindows: [],
  settlement: {},
};

const settlementWindowDetailsOneTransfer = {
  settlementWindow: {
    settlementWindowId: 93,
    settlementWindowStateId: 'PENDING_SETTLEMENT',
    amount: '350.9700',
    currencyId: 'EUR,MAD',
    settlementWindowOpen: '2020-02-26T20:42:03.000Z',
    settlementWindowClose: '2020-02-26T20:42:10.000Z',
  },
  participantAmount: [
    {
      fspId: 'testfsp3',
      inAmount: 0,
      currency: 'EUR',
      outAmount: '27.0000',
      netAmount: '27.0000',
    },
    {
      fspId: 'testfsp4',
      inAmount: '-323.9700',
      currency: 'MAD',
      outAmount: 0,
      netAmount: '-323.9700',
    },
  ],
  totalAmount: [
    {
      EUR: '27.0000',
    },
    {
      MAD: '323.9700',
    },
  ],
  settlementId: 93,
  relatedSettlementWindows: [],
  settlement: {},
};

const classes = {
  tableDetails: '',
};

describe('<SettlementWindowTransfersTab />', async () => {
  it('should not render without props', () => {
    const { queryByText } = render(
      <SettlementWindowTransfersTab />,
    );
    expect(queryByText('Currency')).toBe(null);
  });

  it('should render with props', () => {
    const { queryByText } = render(
      <SettlementWindowTransfersTab
        settlementWindowDetails={settlementWindowDetails}
        classes={classes}
      />,
    );
    const element = queryByText('Currency');
    expect(element).toBeDefined();
  });

  it('should have the right amount of transfers', () => {
    const { queryAllByText } = render(
      <SettlementWindowTransfersTab
        settlementWindowDetails={settlementWindowDetails}
        classes={classes}
      />,
    );
    const transfersEUR = queryAllByText('EUR');
    const transfersMAD = queryAllByText('MAD');
    expect(transfersEUR.length).toBe(2);
    expect(transfersMAD.length).toBe(2);
  });

  it('should display the correct amount for a transfer', () => {
    const { queryAllByText } = render(
      <SettlementWindowTransfersTab
        settlementWindowDetails={settlementWindowDetails}
        classes={classes}
      />,
    );
    const transfersEUR = queryAllByText('-323.9700');
    const transfersMAD = queryAllByText('-27.0000');
    expect(transfersEUR.length).toBe(2);
    expect(transfersMAD.length).toBe(2);
  });

  it('should render all rows', () => {
    const { queryAllByText } = render(
      <SettlementWindowTransfersTab
        settlementWindowDetails={settlementWindowDetailsOneTransfer}
        classes={classes}
      />,
    );
    const fspID = queryAllByText('testfsp3');
    const fspCurrency = queryAllByText('EUR');
    const fspOutAmount = queryAllByText('27.0000');
    const fspInAmount = queryAllByText('0');
    expect(fspOutAmount.length).toBe(2); // We're also counting net amount.
    expect(fspID.length).toBe(1);
    expect(fspCurrency.length).toBe(1);
    expect(fspInAmount.length).toBe(2); // we also count the other fsp outAmount(0)
  });
});
