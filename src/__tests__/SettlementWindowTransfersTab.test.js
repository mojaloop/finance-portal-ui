import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettlementWindowTransfersTab from '../components/SettlementWindowTransfersTab';

const settlementWindowDetails = {
  settlementWindow: {
    settlementWindowId: 93,
    settlementWindowStateId: 'PENDING_SETTLEMENT',
    amount: '1116.8200',
    currencyId: 'EUR,MAD,UGX,ZMW,RWF,GHS',
    settlementWindowOpen: '2020-02-26T20:42:03.000Z',
    settlementWindowClose: '2020-02-26T20:42:10.000Z',
  },
  participantAmount: [
    {
      fspId: 'DFSPEUR',
      currency: 'EUR',
      inAmount: '-20.4800',
      outAmount: '0',
      netAmount: '-20.4800',
    },
    {
      fspId: 'DFSPMAD',
      currency: 'MAD',
      inAmount: '0',
      outAmount: '110.7700',
      netAmount: '110.7700',
    },
    {
      fspId: 'DFSPUGX',
      currency: 'UGX',
      inAmount: '-1082.0000',
      outAmount: '259.0000',
      netAmount: '-823.0000',
    },
    {
      fspId: 'DFSPZMW',
      currency: 'ZMW',
      inAmount: '-21.1900',
      outAmount: '11.9400',
      netAmount: '-9.2500',
    },
    {
      fspId: 'DFSPRWF',
      currency: 'RWF',
      inAmount: '-49.0000',
      outAmount: '64.0000',
      netAmount: '15.0000',
    },
    {
      fspId: 'DFSPGHS',
      currency: 'GHS',
      inAmount: '0',
      outAmount: '6.3200',
      netAmount: '6.3200',
    },
    {
      fspId: 'noresponsepayeefsp',
      currency: 'XOF',
      inAmount: '-11.0000',
      outAmount: '0',
      netAmount: '-11.0000',
    },
    {
      fspId: 'payeefsp',
      currency: 'XOF',
      inAmount: '-1.0000',
      outAmount: '0',
      netAmount: '-1.0000',
    },
    {
      fspId: 'payerfsp',
      currency: 'XOF',
      inAmount: '0',
      outAmount: '12.0000',
      netAmount: '12.0000',
    },
    {
      fspId: 'testfsp1',
      currency: 'XOF',
      inAmount: '0',
      outAmount: '120.0000',
      netAmount: '120.0000',
    },
    {
      fspId: 'testfsp2',
      currency: 'XOF',
      inAmount: '-120.0000',
      outAmount: '0',
      netAmount: '-120.0000',
    },
    {
      fspId: 'testfsp3',
      currency: 'EUR',
      inAmount: '0',
      outAmount: '20.4800',
      netAmount: '20.4800',
    },
    {
      fspId: 'testfsp4',
      currency: 'MAD',
      inAmount: '-110.7700',
      outAmount: '0',
      netAmount: '-110.7700',
    },
    {
      fspId: 'testfsp5',
      currency: 'UGX',
      inAmount: '-259.0000',
      outAmount: '1082.0000',
      netAmount: '823.0000',
    },
    {
      fspId: 'testfsp6',
      currency: 'ZMW',
      inAmount: '-11.9400',
      outAmount: '21.1900',
      netAmount: '9.2500',
    },
    {
      inAmount: '-64.0000',
      fspId: 'testfsp7',
      currency: 'RWF',
      outAmount: '49.0000',
      netAmount: '-15.0000',
    },
    {
      fspId: 'testfsp8',
      currency: 'GHS',
      inAmount: '-6.3200',
      outAmount: '0',
      netAmount: '-6.3200',
    },
  ],
  totalAmount: [
    {
      XOF: '132.0000',
    },
    {
      EUR: '20.4800',
    },
    {
      MAD: '0.0000',
    },
    {
      UGX: '1082.0000',
    },
    {
      ZMW: '21.1900',
    },
    {
      RWF: '49.0000',
    },
    {
      GHS: '0.0000',
    }],
  settlementId: 93,
  relatedSettlementWindows: [],
  settlement: {},
};

const classes = {
  tableDetails: '',
};

const columnHeaders = ['FSP ID', 'Currency', 'In Amount', 'Out Amount', 'Net Amount'];

describe('<SettlementWindowTransfersTab />', async () => {
  it('should not render if the property `settlementWindowDetails` is not defined.', () => {
    const { queryByText } = render(
      <SettlementWindowTransfersTab />,
    );

    columnHeaders.forEach((columnHeader) => {
      expect(queryByText(columnHeader)).toBe(null);
      expect(queryByText(columnHeader)).toBeDefined();
    });
  });

  it('should render if the property `settlementWindowDetails` is defined.', () => {
    const { queryByText } = render(
      <SettlementWindowTransfersTab
        settlementWindowDetails={settlementWindowDetails}
        classes={classes}
      />,
    );

    columnHeaders.forEach((columnHeader) => {
      expect(queryByText(columnHeader)).not.toBe(null);
      expect(queryByText(columnHeader)).toBeDefined();
    });
  });

  it('should render all transfers with the correct amounts.', () => {
    render(<SettlementWindowTransfersTab
      settlementWindowDetails={settlementWindowDetails}
      classes={classes}
    />);

    settlementWindowDetails.participantAmount.forEach((item) => {
      // the FSP ID appears only once
      expect(screen.getAllByText(item.fspId).length).toBe(1);

      // get the row of that FSP ID
      const row = screen.getByText(item.fspId).closest('tr');

      // verify that the columns of the row display the expected values
      expect(row.cells[0]).toHaveTextContent(item.fspId);
      expect(row.cells[1]).toHaveTextContent(item.currency);
      expect(row.cells[2]).toHaveTextContent(item.inAmount);
      expect(row.cells[3]).toHaveTextContent(item.outAmount);
      expect(row.cells[4]).toHaveTextContent(item.netAmount);
    });
  });
});
